const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry : './app.js',
  output : {
    path : path.resolve(__dirname),
    filename : 'bundle.js'
  },
  module : {
    loaders : [{
      test : /\.js$/,
      exclude : /node_modules/,
      loader : 'babel-loader'
    }]
  },
  plugins : [
    new webpack.optimize.UglifyJsPlugin({
      compress : { warnings : false },
      output : { comments : false },
      parallel : true
    })
  ]
}
