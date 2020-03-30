const quadToNTriples = require('@rdfjs/to-ntriples').quadToNTriples
const ReadableToReadable = require('readable-to-readable')

class SerializerStream extends ReadableToReadable {
  constructor (input) {
    super(input, {
      map: quad => quadToNTriples(quad) + '\n'
    })
  }
}

module.exports = SerializerStream
