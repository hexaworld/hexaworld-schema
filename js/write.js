var fs = require('fs'),
    path = require('path')

var hexaworld = require('./hexaworld.js')

var writeSchema = function (dir) {
  var file = path.join(dir, 'hexaworld.json')
  fs.writeFileSync(file, JSON.stringify(hexaworld, null, 2))
  console.log('schema files written to: ' + dir)
}

module.exports = writeSchema
