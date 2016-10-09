'use strict'

const Readable = require('stream').Readable

class NTriplesSerializer extends Readable {
  constructor () {
    super()

    this._read = () => {}
  }

  import (stream) {
    stream.on('data', (quad) => {
      this.push(quad.toCanonical() + '\n')
    })

    stream.on('end', () => {
      this.emit('end')
    })

    stream.on('error', (err) => {
      this.emit('error', err)
    })
  }

  static import (stream) {
    let serializer = new NTriplesSerializer()

    serializer.import(stream)

    return serializer
  }
}

module.exports = NTriplesSerializer
