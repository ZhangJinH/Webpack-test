const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('./webpack.base')

const options = {
  contentBase: '../dist',
  hot: true,
  host: 'localhost'
}


webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)

const server = new webpackDevServer(compiler, options)

server.listen(5000, 'localhost', function () {
  console.log('app is listening on port 4000\n')
})