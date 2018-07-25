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
webpack.base.js
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
webpack.base.js
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
