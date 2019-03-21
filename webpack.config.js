const path = require('path');
const Html = require('html-webpack-plugin');
const fs = require('fs');

const exercisesDir = path.resolve(__dirname, 'src', 'exercises');
const exercises = fs.readdirSync(exercisesDir);

module.exports = {
  mode: 'development',
  entry: exercises.reduce((prev, curr) => {
    prev[curr.split('.')[0]] = require.resolve(
      path.resolve(exercisesDir, curr)
    );
    return prev;
  }, {}),
  plugins: exercises.map(exercise => {
    const filename = exercise.split('.')[0];
    return new Html({
      title: 'Computação Gráfica',
      template: 'index.html',
      chunks: [filename],
      filename: filename === 'index' ? 'index.html' : `${filename}/index.html`
    });
  }),
  output: {
    path: __dirname + '/dist',
    publicPath:
      process.env.NODE_ENV === 'development' ? '/' : '/computacao-grafica',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.ts', '.js']
  },
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : '',
  devServer: {
    contentBase: path.join('/dist'),
    hot: true,
    port: 3000
  }
};
