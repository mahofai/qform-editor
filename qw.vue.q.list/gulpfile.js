const { series } = require('gulp')
const webpack = require('webpack')
const frontendConfig = require('./webpack/prod.config')

function buildFrontend(done) {
  webpack(frontendConfig).run(onBuild(done))
}

function onBuild(done) {
  return (err, stats) => {
    if (err) {
      console.log('Error', err)
    } else {
      console.log(stats.toString())
    }
    if (done) {
      done()
    }
  }
}

exports.default = series(buildFrontend)
