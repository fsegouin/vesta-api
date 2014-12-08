/*global describe, it */
/**
* REST API Tests
*/
var request = require('supertest');
var app = require('../server/server.js');
var assert = require('assert');

function json(verb, url) {
  return request(app)[verb](url)
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/);
}

describe('REST', function() {
  this.timeout(30000);

  /**
  * Expected Input Tests
  */

  var token;
  var userId;
  var cartopartyId;
  var recordId;
  var cityId;

  describe('/api/users', function() {
    // hard-coded data
    var credentials = { email: 'john.doe@foo.com', password: '12345' };

    it('should create a new user on POST /api/users',
    function(done) {
      json('post', '/api/users')
      .send({
        firstname: 'John',
        lastname: 'Doe',
        username: 'jdoe',
        password: '12345',
        email: 'john.doe@foo.com'
      })
      .expect(200, function(err, res) {
        if (err) return done(err);
        assert(res.body.id !== undefined);
        assert.equal(res.body.email, 'john.doe@foo.com');
        done();
      });
    });

    it('should login existing user on POST /api/users/login',
    function(done) {
      json('post', '/api/users/login?include=user')
      .send(credentials)
      .expect(200, function(err, res) {
        if (err) return done(err);
        token = res.body;
        assert(token.userId !== undefined);
        userId = token.userId;
        done();
      });
    });

    it('should allow GET /api/users/{my-id}', function(done) {
      json('get', '/api/users/' + userId)
      .set('Authorization', token.id)
      .expect(200, function(err, res) {
        if (err) return done(err);
        assert.equal(res.body.email, token.user.email);
        done();
      });
    });

    it('should not allow GET /api/users/{another-id}', function(done) {
      json('get', '/api/users/' + (userId + 1000))
      .set('Authorization', token.id)
      .expect(401, function(err) {
        done(err);
      });
    });

    it('should create a new cartoparty', function(done) {
      json('post', '/api/users/' + userId + '/leads')
      .set('Authorization', token.id)
      .send({
        description: '13ème arrondissement de Paris',
        from: '2014-02-01T00:00:00.000Z',
        to: '2014-03-01T00:00:00.000Z'
      })
      .expect(200)
      .end(function(err, res) {
        assert(typeof res.body === 'object');
        assert(res.body.id, 'must have an id');
        cartopartyId = res.body.id;
        done();
      });
    });

    it('should update a cartoparty with a given id', function(done) {
      json('put', '/api/users/' + userId + '/leads/' + cartopartyId)
      .set('Authorization', token.id)
      .send({
        from: '2014-04-01T00:00:00.000Z',
        to: '2014-05-01T00:00:00.000Z'
      })
      .expect(200, function(err, res) {
        var updatedCartoparty = res.body;
        assert(updatedCartoparty);
        assert(updatedCartoparty.id);
        assert.equal(updatedCartoparty.id, cartopartyId);
        assert.equal(updatedCartoparty.from, '2014-04-01T00:00:00.000Z');
        json('get', '/api/Cartoparties/' + cartopartyId)
        .set('Authorization', token.id)
        .expect(200, function(err, res) {
          var foundCartoparty = res.body;
          assert.equal(foundCartoparty.id, cartopartyId);
          assert.equal(foundCartoparty.from, '2014-04-01T00:00:00.000Z');
          done();
        });
      });
    });

    it('should allow to add itself to a cartoparty with a given id', function(done) {
      json('put', '/api/users/' + userId +  '/cartoparties/rel/' + cartopartyId)
      .set('Authorization', token.id)
      .expect(200, function(err, res) {
        assert.equal(res.body.userId, userId);
        assert.equal(res.body.cartopartyId, cartopartyId);
        done();
      });
    });

    it('should not allow to add someone else to a cartoparty with a given id', function(done) {
      json('put', '/api/users/' + 1 + '/cartoparties/rel/' + cartopartyId)
      .set('Authorization', token.id)
      .expect(401, function(err) {
        done(err);
      });
    });

  });

  describe('Expected Usage', function() {

    describe('GET /api/Cartoparties', function() {
      it('should return a list of all cartoparties', function(done) {
        json('get', '/api/Cartoparties')
        .set('Authorization', token.id)
        .expect(200)
        .end(function(err, res) {
          assert(Array.isArray(res.body));
          assert(res.body.length);
          done();
        });
      });
    });

    describe('GET /api/Cartoparties/:id/users', function() {
      it('should return a list of all members in a cartoparty with a given id', function(done) {
        json('get', '/api/Cartoparties/' + cartopartyId + '/users')
        .set('Authorization', token.id)
        .expect(200)
        .end(function(err, res) {
          assert(Array.isArray(res.body));
          assert(res.body.length);
          done();
        });
      });
    });

    describe('POST /Cities', function() {
      it('should create a new city', function(done) {
        json('post', '/api/Cities/')
        .set('Authorization', token.id)
        .send({
          postalcode: '75013',
          cityname: 'Paris'
        })
        .expect(200)
        .end(function(err, res) {
          assert(typeof res.body === 'object');
          assert(res.body.id, 'must have an id');
          cityId = res.body.id;
          done();
        });
      });
    });

    describe('GET /Cities', function() {
      it('should return a list of all cities', function(done) {
        json('get', '/api/Cities')
        .set('Authorization', token.id)
        .send({
          postalcode: '10000',
          cityname: 'Troyes'
        })
        .expect(200)
        .end(function(err, res) {
          assert(Array.isArray(res.body));
          assert(res.body.length);
          done();
        });
      });
    });

    describe('PUT /Cartoparties/:id/cities/rel/:fk', function() {
      it('should allow to add a city to a cartoparty with a given id', function(done) {
        json('put', '/api/Cartoparties/' + cartopartyId +  '/cities/rel/' + cityId)
        .set('Authorization', token.id)
        .expect(200, function(err, res) {
          assert.equal(res.body.cityId, cityId);
          assert.equal(res.body.cartopartyId, cartopartyId);
          done();
        });
      });
    });

    describe('POST /Cartoparties/:id/records when a member', function() {
      it('should allow to add records to a cartoparty if the user is a member of this cartoparty', function(done) {
        json('post', '/api/Cartoparties/' + cartopartyId + '/records')
        .set('Authorization', token.id)
        .send({
          name: 'Pharmacie Martin',
          note: 'Pharmacie de garde ouverte du Mardi au Dimanche',
          userId: userId
        })
        .expect(200)
        .end(function(err, res) {
          assert(typeof res.body === 'object');
          assert(res.body.id, 'must have an id');
          assert(res.body.cartopartyId, cartopartyId);
          recordId = res.body.id;
          done();
        });
      });
    });

    describe('POST /Cartoparties/:id/records when not a member', function() {
      it('should not allow to add records to a cartoparty if the user is not a member of this cartoparty', function(done) {
        json('post', '/api/Cartoparties/' + 2 + '/records')
        .set('Authorization', token.id)
        .send({
          name: 'Pharmacie Martin',
          note: 'Pharmacie de garde ouverte du Mardi au Dimanche',
          userId: userId
        })
        .expect(401, function(err) {
          done(err);
        });
      });
    });

    describe('POST /Records/:id/points', function() {
      it('should be able to add point to a record with a given id', function(done) {
        json('post', '/api/Records/' + recordId + '/points')
        .set('Authorization', token.id)
        .send({
          coordinates: {
            lat: 48.3000000,
            lng: 4.0833300
          },
          recordId: recordId
        })
        .expect(200)
        .end(function(err, res) {
          assert(typeof res.body === 'object');
          assert(res.body.id, 'must have an id');
          assert.equal(res.body.recordId, recordId);
          assert.equal(res.body.coordinates.lat, 48.3000000);
          assert.equal(res.body.coordinates.lng, 4.0833300);
          done();
        });
      });
    });

    describe('GET /Cartoparties/:id/records', function() {
      it('should return a list of all records along with points for a given id', function(done) {
        json('get', '/api/Cartoparties/' + cartopartyId + '/records')
        .set('Authorization', token.id)
        .set('filter', '{"include":"points"}')
        .expect(200, function(err, res) {
          assert(typeof res.body === 'object');
          assert(res.body[0].id, 'must have an id');
          assert.equal(res.body[0].id, recordId);
          assert.equal(res.body[0].cartopartyId, cartopartyId);
          assert.equal(res.body[0].points[0].coordinates.lat, 48.3000000);
          done();
        });
      });
    });

    describe('GET /Records/fromUser/:id', function() {
      it('should return a list of all records saved from a given user id', function(done) {
        json('get', '/api/Records/fromUser/' + userId)
        .set('Authorization', token.id)
        .expect(200, function(err, res) {
          assert(typeof res.body === 'object');
          assert(typeof res.body['records'] === 'object');
          assert(res.body['records'][0].id, 'must have an id');
          assert.equal(res.body['records'][0].cartopartyId, cartopartyId);
          assert.equal(res.body['records'][0].userId, userId);
          done();
        });
      });
    });

  });

});
