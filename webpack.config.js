var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: "#inline-source-map",
    entry: [
        './app'
    ],

    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: './',
      libraryTarget: 'umd'
    },
};
