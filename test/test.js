const { strictEqual } = require('assert')
const getStream = require('get-stream')
const { describe, it } = require('mocha')
const rdf = require('@rdfjs/data-model')
const sinkTest = require('@rdfjs/sink/test')
const Readable = require('readable-stream')
const NTriplesSerializer = require('..')

describe('@rdfjs/serializer-ntriples', () => {
  sinkTest(NTriplesSerializer, { readable: true })

  it('should serialize incoming quads', async () => {
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

    const result = await getStream(stream)

    strictEqual(result, ntriples)
  })
})
