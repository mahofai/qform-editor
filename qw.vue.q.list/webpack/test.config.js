'use strict'

const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  devtool: 'inline-cheap-module-source-map',
  externals: [nodeExternals()]
})
