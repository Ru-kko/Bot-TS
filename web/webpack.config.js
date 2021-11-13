const path = require('path');

module.exports = {
  watch: false,
  entry: './build/front/scripts/home.js',
  output: {
    path: path.join(__dirname, 'static/dist/'),
    publicPath: '/',
    filename: 'bundle.js'
 }
}