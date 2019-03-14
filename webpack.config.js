const path = require('path');
const Html = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'index.ts'),
  watch: true,
  plugins: [new Html({
    title: 'Computação Gráfica'
  })],
  output: {
    path: __dirname + 'dist',
    publicPath: '/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.json', '.ts', '.js']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join('/'),
    inline: true,
    hot: true,
    port: 3000,
  }
};