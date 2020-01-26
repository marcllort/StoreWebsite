var path = require('path');
var webpack = require('webpack');
console.log("a");
 module.exports = {
     entry: './api_list.js',
     output: {
         path: path.resolve(__dirname, './build'),
         filename: 'app.bundle.js'
     },
     module: {
        rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                query: {
                    presets: ["@babel/preset-env"]

    }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };