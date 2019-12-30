const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  mode: 'production',
  module: {
      rules: [
          {
              test: '/.js/',
              use: 'file-loader',
          }
      ]
  },
  
};