const path = require('path')

const paths = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  static: path.resolve(__dirname, '../static'),
  resolve: (dir) => {
    return path.join(__dirname, '..', dir)
  }
}

module.exports = paths
