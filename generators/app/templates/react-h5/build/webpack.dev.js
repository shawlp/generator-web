const webpack = require('webpack')
const { merge } = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const base = require('./webpack.base')
const paths = require('./paths')
const config = require('../config')

const smp = new SpeedMeasurePlugin()

const { proxyTable, port, host, open } = config.dev

const webpackDevConfig = smp.wrap(
  merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      disableHostCheck: true,
      historyApiFallback: true,
      contentBase: paths.dist,
      inline: true,
      port,
      proxy: proxyTable,
      host,
      open,
      stats: 'errors-only'
    },
    target: 'web',
    cache: {
      type: 'filesystem'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${host}:${port}`]
        }
      })
    ]
  })
)

module.exports = webpackDevConfig
