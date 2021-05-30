function getArgvEnv() {
  const index = process.argv.findIndex((item) => item === '--env')
  return process.argv[index + 1] || 'test'
}

/** 是否是unix内核 */
const isUnixSystem = process.platform === 'darwin'

module.exports = {
  dev: {
    proxyTable: {
      '/api/': {
        target: 'http://1.1.1.1:8080/',
        changeOrigin: true
      }
    },
    useEslint: true,
    host: '127.0.0.1',
    port: 8888,
    open: isUnixSystem ? 'Google Chrome' : false
  },
  build: {},
  proxy_mock: getArgvEnv()
}
