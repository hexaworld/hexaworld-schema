var assert = require('assert')
var fs = require('fs')
var path = require('path')

var Validator = require('jsonschema').Validator

var hexaworld = require('../js/hexaworld.js')

var runTest = function () {
  var fileName = path.join(__dirname, 'examples', 'simple-good.json')
  var goodJson = JSON.parse(fs.readFileSync(fileName))
  var v = new Validator()
  var result = v.validate(goodJson, hexaworld)
  assert.deepEqual(result.errors, [])
}

module.exports = runTest

