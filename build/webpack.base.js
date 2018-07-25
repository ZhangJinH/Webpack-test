const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/main.js',
  },
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: '../dist',
  //   hot: true
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: '这是Plugin设置的标题'
    }),
    new CleanWebpackPlugin(['../dist']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  }
}