const path = require('path');

module.exports = {
  mode: 'development',
  entry: `${path.join(__dirname, '/client/src')}/index.js`,
  output: {
    filename: 'bundle.js',
    path: `${path.join(__dirname, '/client/dist')}`
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};