import React, { Component } from 'react'
import cx from 'classnames'

class ThreadList extends Component {

  click = id => e => {
    const { board, onClick } = this.props
    if (!e.shiftKey) {
      return window.open(`https://boards.4chan.org/${board}/thread/${id}`)
    }

    onClick(id)
  }

  renderThread = (t, watched) => {
    const { board } = this.props

    return (
      <div
        key={t.no}
        onClick={this.click(t.no)}
        className={cx('thread-block', { watched })}>

        <div
          className='back'
          style={{
            background: `url(https://t.4cdn.org/${board}/${t.tim}s.jpg)`,
            backgroundSize: 'cover',
          }}
        />

        <span className='replies'>{t.replies}</span>

        <div className='content'>
          {t.sub && (<p className='title' dangerouslySetInnerHTML={{ __html: t.sub }} />)}
          <span dangerouslySetInnerHTML={{ __html: t.com }} />
        </div>

      </div>
    )
  }

  render () {

    const { threads, watch } = this.props

    if (!threads.length) {
      return (
        <div className='threads'>
          {Array(20).fill(0).map((v, i) => (
            <div className='thread-block' key={i} />
          ))}
        </div>
      )
    }

    const ids = Object.keys(watch).reduce((out, key) => watch[key] ? out.concat(key) : out, [])

    // meh.
    const watched = threads.filter(t => ids.includes(t.no.toString())).sort((a, b) => a.no - b.no)
    const nonWatched = threads.filter(t => !ids.includes(t.no.toString()))

    return (
      <div className='threads'>
        {watched.map(t => this.renderThread(t, true))}
        {nonWatched.map(t => this.renderThread(t))}
      </div>
    )
  }

}

export default ThreadList
