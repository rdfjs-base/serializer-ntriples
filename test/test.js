/* global describe, it */

const assert = require('assert')
const rdf = require('@rdfjs/data-model')
const sinkTest = require('rdf-sink/test')
const NTriplesSerializer = require('..')
const Readable = require('readable-stream')

function waitFor (stream) {
  return new Promise((resolve, reject) => {
    stream.on('end', resolve)
    stream.on('error', reject)
  })
}

describe('@rdfjs/serializer-ntriples', () => {
  sinkTest(NTriplesSerializer, {readable: true})

  it('should serialize incoming quads', () => {
    const quad = rdf.quad(
      rdf.namedNode('http://example.org/subject'),
      rdf.namedNode('http://example.org/predicate'),
      rdf.literal('object'),
      rdf.namedNode('http://example.org/graph')
    )

    const ntriples = '<http://example.org/subject> <http://example.org/predicate> "object" <http://example.org/graph> .\n'

    const input = new Readable({
      objectMode: true,
      read: () => {
        input.push(quad)
        input.push(null)
      }
    })

    const serializer = new NTriplesSerializer()
    const stream = serializer.import(input)

    return Promise.resolve().then(() => {
      assert.equal(stream.read().toString(), ntriples)

      return waitFor(stream)
    })
  })
})
