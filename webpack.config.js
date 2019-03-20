const path = require('path');
const Html = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.ts'),
  plugins: [new Html({
    title: 'Computação Gráfica',
    template: 'index.html'
  })],
  output: {
    path: __dirname + '/dist',
    publicPath: '/computacao-grafica',
    filename: 'bundle.js',
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
    contentBase: path.join('/dist'),
    hot: true,
    port: 3000,
  }
};