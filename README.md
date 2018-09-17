# @rdfjs/serializer-ntriples

[![Build Status](https://travis-ci.org/rdfjs/serializer-ntriples.svg?branch=master)](https://travis-ci.org/rdfjs/serializer-ntriples)

[![npm version](https://img.shields.io/npm/v/@rdfjs/serializer-ntriples.svg)](https://www.npmjs.com/package/@rdfjs/serializer-ntriples)

N-Triples serializer that implements the [RDFJS Sink interface](http://rdf.js.org/).

## Usage

The package exports the serializer as a class, so an instance must be created before it can be used.
The `.import` method, as defined in the [RDFJS specification](http://rdf.js.org/#sink-interface), must be called to do the actual serialization.
It expects a quad stream as argument.
The method will return a stream which emits N-Triples as strings.
The constructor doesn't need any options.

### Example

This example shows how to create a serializer instance and how to feed it with a stream of quads.
The N-Triples string emitted by the serializer will be written to the console.

```javascript
const rdf = require('@rdfjs/data-model')
const Readable = require('stream').Readable
const SerializerNtriples = require('@rdfjs/serializer-ntriples')

const serializerNtriples = new SerializerNtriples()
const input = new Readable({
  objectMode: true,
  read: () => {
    input.push(rdf.quad(
      rdf.namedNode('http://example.org/sheldon-cooper'),
      rdf.namedNode('http://schema.org/givenName'),
      rdf.literal('Sheldon')))
    input.push(rdf.quad(
      rdf.namedNode('http://example.org/sheldon-cooper'),
      rdf.namedNode('http://schema.org/familyName'),
      rdf.literal('Cooper')))
    input.push(rdf.quad(
      rdf.namedNode('http://example.org/sheldon-cooper'),
      rdf.namedNode('http://schema.org/knows'),
      rdf.namedNode('http://example.org/amy-farrah-fowler')))
    input.push(null)
  }
})
const output = serializerNtriples.import(input)

output.on('data', ntriples => {
  console.log(ntriples.toString())
})
```
