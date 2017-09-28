const   webpack = require('webpack'),
        UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  output: {
    filename: 'bundle.js'
  },
  // plugins: [
  //   new UglifyJSPlugin({
  //     sourceMap: true
  //   })
  // ],
  module: {
    rules: [
      {
        enforce: "pre",
        loader: "eslint-loader",
        options: {
            fix: true
        }            
      },
    ]  
  }
}
module.exports = config;