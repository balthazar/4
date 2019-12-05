import webpack from 'webpack'
import { StatsWriterPlugin } from 'webpack-stats-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

import webpackConfig from './config'

export default {
  ...webpackConfig,

  output: {
    ...webpackConfig.output,
    filename: 'bundle-[hash].js',
  },

  module: {
    loaders: [
      ...webpackConfig.module.loaders,
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    ...webpackConfig.plugins,

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),

    new StatsWriterPlugin({
      transform: data =>
        JSON.stringify({
          main: data.assetsByChunkName.main,
        }),
    }),

    new ProgressBarPlugin(),
  ],

  stats: {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false,
  },
}
