const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/js/client/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
}