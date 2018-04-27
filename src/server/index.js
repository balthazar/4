import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import cache from 'memory-cache'
import r from 'axios'

import config from 'config'
import render from 'server/render'

const server = express()

server.use(morgan('dev'))

if (config.env === 'development') {
  require('./webpack').default(server)
}

if (config.env === 'production') {
  server.use(compression())
  server.use('/dist', express.static(config.distFolder))
}

server.get('/api/img/:board/:name', (req, res) => {
  const { board, name } = req.params

  r({
    method: 'get',
    url: `https://i.4cdn.org/${board}/${name}`,
    responseType: 'stream',
  }).then(response => response.data.pipe(res))
})

server.get('/api/boards', (req, res) => {
  const cached = cache.get('boards')
  if (cached) {
    return res.send(cached)
  }

  r('https://a.4cdn.org/boards.json')
    .then(({ data }) => {
      // 1d
      cache.put('boards', data.boards, 1e3 * 60 * 60 * 24)
      cache.boards = data.boards
      res.send(data.boards)
    })
    .catch(err => {
      console.log(err) // eslint-disable-line
      res.status(400).end()
    })
})

server.get('/api/boards/:name', (req, res) => {
  const key = `boards.${req.params.name}`
  const cached = cache.get(key)
  if (cached) {
    return res.send(cached)
  }

  r(`https://a.4cdn.org/${req.params.name}/catalog.json`)
    .then(({ data }) => {
      const threads = data.reduce((out, cur) => out.concat(cur.threads), []).slice(1)
      // 10s
      cache.put(key, threads, 1e3 * 10)
      res.send(threads)
    })
    .catch(err => {
      console.log(err) // eslint-disable-line
      res.status(400).end()
    })
})

server.use('/assets', express.static(config.assetsFolder))
server.use(render)

server.listen(config.port, 'localhost', err => {
  /* eslint-disable no-console */
  if (err) {
    return console.log(err)
  }
  console.log(`[APP] listening at localhost:${config.port} in ${config.env} mode`)
  /* eslint-enable no-console */
})
