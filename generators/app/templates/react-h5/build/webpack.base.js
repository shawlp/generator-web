const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')
const paths = require('./paths')
const config = require('../config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const isPro = process.env.NODE_ENV === 'production'

const createEslintRule = () => ({
  test: /\.(.tsx?|js)$/,
  use: ['eslint-loader'],
  include: [paths.src],
  enforce: 'pre'
})

/** 移除不必要的代码 */
const webpackStripLoader = {
  loader: 'webpack-strip-block',
  options: {
    start: 'DEV-START',
    end: 'DEV-END'
  }
}

const loader = isPro ? MiniCssExtractPlugin.loader : { loader: 'style-loader' }

const webpackBaseConfig = {
  entry: `${paths.src}/index.tsx`,
  output: {
    path: paths.dist,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve('src'),
      '@routes': resolve('src/routes/'),
      '@styles': resolve('src/styles/'),
      '@images': resolve('src/images/'),
      '@service': resolve('src/service/'),
      '@views': resolve('src/views/'),
      '@utils': resolve('src/utils/'),
      '@hooks': resolve('src/hooks/'),
      '@components': resolve('src/components/')
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PROXY_MOCK': JSON.stringify(config.proxy_mock === 'mock')
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'react h5 project',
      favicon: `${paths.static}/favicon.svg`,
      template: `${paths.static}/index.html`,
      filename: 'index.html'
    }),
    new ESLintPlugin({
      files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx'],
      failOnWarning: true,
      threads: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.static,
          to: `${paths.dist}/static`
        }
      ]
    })
  ],
  module: {
    rules: [
      ...(config.dev.useEslint ? [createEslintRule()] : []),
      {
        test: /\.(tsx?|js)$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true, cacheCompression: false }
          },
          ...(isPro ? [webpackStripLoader] : [])
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset'
      },
      {
        test: /\.(less|css)$/,
        use: [
          loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'global',
                localIdentName: '[name]_[hash:base64:6]'
              }
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

module.exports = webpackBaseConfig
