# webpack-test
尝试使用基础webpack搭建vue项目

## 1.项目搭建
```
/build 基础配置
/config 配置文件
/src 项目源代码
/static 静态资源目录
index.html 
```
配置 package.json 文件

```
"scripts": {
    ...
    "build": "webpack --config .\\build\\webpack.base.js"
    ...
  },
```
新增build命令 将打包模版文件指向目标文件

## 2.管理资源文件
##### 2.1 配置文件loader(解析文件)
```
// webpack.base.js
{
  ...
  // webpack配置项
  module: {
    // 配置文件匹配规则
    rules: [
      {
        test: /\.css$/, // 只匹配.css后缀文件
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
  ...
}
```
##### 2.2 配置多个入口文件
```
// webpack.base.js
{
  ...
  entry: {
    app: './src/main.js',
    print: './src/print.js'
  },
  ...
}
```
##### 2.3 配置插件
```
{
  ...
  // 可配置多个插件
  plugins: [
    // 配置html一些基础信息
    new HtmlWebpackPlugin({
      title: '这是Plugin设置的标题'
    }),
    // 清除dist下文件 (注意路径是相对于base.js的路径)
    new CleanWebpackPlugin(['../dist'])
  ],
  ...
}
```
##### 2.4 使用source map 帮助定位打包报错
```
{
  ...
  devtool: 'inline-source-map' // 还有其他可配置项
  ...
}
```
##### 2.5 监听文件变化
在package.json文件中新增命令
```
  "watch": "webpack --config .\\build\\webpack.base.js --watch"
```
-- watch 修改文件会重新编译文件，但是打开的静态html还需要刷新才能执行新代码
##### 2.6 配置开发服务器
###### 2.6.1 使用webpack配置项中的devServer搭建服务器
```
// webpack.base.js 
{
  ...
  devServer: {
    contentBase: '../dist', // 注意路径
  }
  ...
}
// package.json
  "start": "webpack-dev-server --config .\\build\\webpack.base.js --open"
```
###### 2.6.2 使用express+webpck-dev-middleware插件搭开发服务器
```
// dev-server.js
const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')

const app = express()

const config = require('./webpack.base')

const compiler = webpack(config)


app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

// 监听4000端口
app.listen(4000, function () {
  console.log('app is listening on port 4000\n')
})
```
在package.json文件中新增命令
```
  "server": "node .\\build\\dev-server.js"
```
启用服务，需要手动输入网址，无hot-reload

##### 2.7 hot-reload
在2.6的两种方式的基础上进行修改
###### 2.7.1 使用webpack配置项中的devServer设置hot-reload
```
// webpack.base.js
...
  devServer: {
    contentBase: '../dist', // 注意路径
    hot: true // 启用hot-reload
  }
...
```
###### 2.7.1 使用nodejs Api (与上面逻辑差不多,换种方式处理,更灵活)
```
// dev-server.js
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('./webpack.base')

const options = {
  contentBase: '../dist',
  hot: true,
  host: 'localhost'
}

// 配置webpackdevserver
webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)

const server = new webpackDevServer(compiler, options)

// 启用server
server.listen(5000, 'localhost', function () {
  console.log('app is listening on port 4000\n')
})
```



