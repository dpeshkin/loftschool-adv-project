const   webpack = require('webpack'),
        UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
};

module.exports = config;