const path = require('path')
const webpack = require('webpack')
const VirtualModulesPlugin = require('webpack-virtual-modules')

const virtualEntries = {
  './a.virtual': getServerEntry('./entries/a.js'),
  './b.virtual': getServerEntry('./entries/b.js'),
}

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    a: ['./a.virtual', 'webpack/hot/poll?250'],
    b: ['./b.virtual', 'webpack/hot/poll?250'],
  },
  cache: {
    type: 'filesystem',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    //
    new VirtualModulesPlugin(virtualEntries),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

function getServerEntry(entry) {
  return `
  import http from 'http'

  const opts = {}
  let currentHandler = require('${entry}').default(opts)
  const server = http.createServer(currentHandler)

  const port = process.env.SERVER_PORT || 3000
  server.listen(port, error => {
    if (error) {
      console.error(error)
    }
    console.log(\`🚀 Listening on port \${port}\n\`)
  })

  if (module.hot) {
    module.hot.accept('${entry}', () => {
      console.log('🔁 HMR Reloading server ...')
      server.removeListener('request', currentHandler)
      const newHandler = require('${entry}').default(opts)
      server.on('request', newHandler)
      currentHandler = newHandler
    })
  }
  `
}
