import path from 'path'

const env = process.env.NODE_ENV || 'development'

export default {

  env,
  host: process.env.HOST || '0.0.0.0',
  port: 3000,

  assetsFolder: path.join(__dirname, './assets'),
  distFolder: path.join(__dirname, '../dist'),

}
