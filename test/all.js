var fs = require('fs'),
    path = require('path')

var _ = require('lodash')

var testAll = function () {
  fs.readdir(__dirname, function (err, files) {
    if (err) throw err
    _.forEach(files, function (file) {
        if (path.extname(file) === '.js' && file !== 'all.js') {
          console.log('running test: ' + file)
          var tests = require(path.join(__dirname, file))
          tests()
        }
    })
  })
}

testAll()
