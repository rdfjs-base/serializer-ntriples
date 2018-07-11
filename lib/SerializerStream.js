const quadToNTriples = require('@rdfjs/to-ntriples').quadToNTriples
const Readable = require('readable-stream')

class SerializerStream extends Readable {
  constructor (input) {
    super({
      read: () => {}
    })

    input.on('data', quad => {
      this.push(quadToNTriples(quad) + '\n')
    })

    input.on('end', () => {
      this.push(null)
    })

    input.on('error', err => {
      this.emit('error', err)
    })
  }
}

module.exports = SerializerStream
