const SerializerStream = require('./lib/SerializerStream')
const Sink = require('@rdfjs/sink')

class Serializer extends Sink {
  constructor () {
    super(SerializerStream)
  }
}

module.exports = Serializer
