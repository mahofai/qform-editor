'use strict'

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'q-list.min.js',
    libraryTarget: 'umd',
    library: 'QList'
  }
})

module.exports.devtool = false

/* extra plugins need for production */
module.exports.plugins = (module.exports.plugins || []).concat([
  new CleanWebpackPlugin()
])
