const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')

const app = express()

const config = require('./webpack.base')

const compiler = webpack(config)


app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(4000, function () {
  console.log('app is listening on port 4000\n')
})