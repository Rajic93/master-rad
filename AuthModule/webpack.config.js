const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: 'index.js',
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].[hash].js',
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
      ]
    },
};
