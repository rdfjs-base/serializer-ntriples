/* global describe, it */
var assert = require('assert')
var rdf = require('rdf-ext')
var NTriplesSerializer = require('../')

var simpleGraph = rdf.createGraph()

simpleGraph.add(rdf.createTriple(
  rdf.createNamedNode('http://example.org/subject'),
  rdf.createNamedNode('http://example.org/predicate'),
  rdf.createLiteral('object')
))

var simpleGraphNT = '<http://example.org/subject> <http://example.org/predicate> "object" .'

describe('N-Triples serializer', function () {
  describe('instance API', function () {
    describe('callback API', function () {
      it('should be supported', function (done) {
        var serializer = new NTriplesSerializer()

        Promise.resolve(new Promise(function (resolve, reject) {
          serializer.serialize(simpleGraph, function (error, nTriples) {
            if (error) {
              reject(error)
            } else {
              resolve(nTriples)
            }
          })
        })).then(function (nTriples) {
          assert.equal(nTriples.trim(), simpleGraphNT)

          done()
        }).catch(function (error) {
          done(error)
        })
      })
    })

    describe('Promise API', function () {
      it('should be supported', function (done) {
        var serializer = new NTriplesSerializer()

        serializer.serialize(simpleGraph).then(function (nTriples) {
          assert.equal(nTriples.trim(), simpleGraphNT)

          done()
        }).catch(function (error) {
          done(error)
        })
      })
    })

    describe('Stream API', function () {
      it('should be supported', function (done) {
        var serializer = new NTriplesSerializer()
        var nTriples

        serializer.stream(simpleGraph).on('data', function (data) {
          nTriples = data
        }).on('end', function () {
          if (!nTriples) {
            done('no data streamed')
          } else if (nTriples.trim() !== simpleGraphNT) {
            done('wrong output')
          } else {
            done()
          }
        }).on('error', function (error) {
          done(error)
        })
      })
    })
  })

  describe('static API', function () {
    describe('callback API', function () {
      it('should be supported', function (done) {
        Promise.resolve(new Promise(function (resolve, reject) {
          NTriplesSerializer.serialize(simpleGraph, function (error, nTriples) {
            if (error) {
              reject(error)
            } else {
              resolve(nTriples)
            }
          })
        })).then(function (nTriples) {
          assert.equal(nTriples.trim(), simpleGraphNT)

          done()
        }).catch(function (error) {
          done(error)
        })
      })
    })

    describe('Promise API', function () {
      it('should be supported', function (done) {
        NTriplesSerializer.serialize(simpleGraph).then(function (nTriples) {
          assert.equal(nTriples.trim(), simpleGraphNT)

          done()
        }).catch(function (error) {
          done(error)
        })
      })
    })

    describe('Stream API', function () {
      it('should be supported', function (done) {
        var nTriples

        NTriplesSerializer.stream(simpleGraph).on('data', function (data) {
          nTriples = data
        }).on('end', function () {
          if (!nTriples) {
            done('no data streamed')
          } else if (nTriples.trim() !== simpleGraphNT) {
            done('wrong output')
          } else {
            done()
          }
        }).on('error', function (error) {
          done(error)
        })
      })
    })
  })
})
