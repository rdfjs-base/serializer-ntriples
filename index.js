var rdf = require('rdf-ext')
var util = require('util')
var AbstractSerializer = require('rdf-serializer-abstract')

function NTriplesSerializer () {
  AbstractSerializer.call(this, rdf)
}

util.inherits(NTriplesSerializer, AbstractSerializer)

NTriplesSerializer.prototype.serialize = function (graph, done) {
  return new Promise(function (resolve) {
    done = done || function () {}

    var nTriples = ''

    graph.forEach(function (triple) {
      nTriples += triple.toString() + '\n'
    })

    done(null, nTriples)
    resolve(nTriples)
  })
}

// add singleton methods to class
var instance = new NTriplesSerializer()

for (var property in instance) {
  NTriplesSerializer[property] = instance[property]
}

module.exports = NTriplesSerializer
