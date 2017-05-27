'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPostsapp;

describe('Postsapp API:', function() {
  describe('GET /api/postsapps', function() {
    var postsapps;

    beforeEach(function(done) {
      request(app)
        .get('/api/postsapps')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          postsapps = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(postsapps).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/postsapps', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/postsapps')
        .send({
          name: 'New Postsapp',
          info: 'This is the brand new postsapp!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPostsapp = res.body;
          done();
        });
    });

    it('should respond with the newly created postsapp', function() {
      expect(newPostsapp.name).to.equal('New Postsapp');
      expect(newPostsapp.info).to.equal('This is the brand new postsapp!!!');
    });
  });

  describe('GET /api/postsapps/:id', function() {
    var postsapp;

    beforeEach(function(done) {
      request(app)
        .get(`/api/postsapps/${newPostsapp._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          postsapp = res.body;
          done();
        });
    });

    afterEach(function() {
      postsapp = {};
    });

    it('should respond with the requested postsapp', function() {
      expect(postsapp.name).to.equal('New Postsapp');
      expect(postsapp.info).to.equal('This is the brand new postsapp!!!');
    });
  });

  describe('PUT /api/postsapps/:id', function() {
    var updatedPostsapp;

    beforeEach(function(done) {
      request(app)
        .put(`/api/postsapps/${newPostsapp._id}`)
        .send({
          name: 'Updated Postsapp',
          info: 'This is the updated postsapp!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPostsapp = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPostsapp = {};
    });

    it('should respond with the updated postsapp', function() {
      expect(updatedPostsapp.name).to.equal('Updated Postsapp');
      expect(updatedPostsapp.info).to.equal('This is the updated postsapp!!!');
    });

    it('should respond with the updated postsapp on a subsequent GET', function(done) {
      request(app)
        .get(`/api/postsapps/${newPostsapp._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let postsapp = res.body;

          expect(postsapp.name).to.equal('Updated Postsapp');
          expect(postsapp.info).to.equal('This is the updated postsapp!!!');

          done();
        });
    });
  });

  describe('PATCH /api/postsapps/:id', function() {
    var patchedPostsapp;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/postsapps/${newPostsapp._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Postsapp' },
          { op: 'replace', path: '/info', value: 'This is the patched postsapp!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPostsapp = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPostsapp = {};
    });

    it('should respond with the patched postsapp', function() {
      expect(patchedPostsapp.name).to.equal('Patched Postsapp');
      expect(patchedPostsapp.info).to.equal('This is the patched postsapp!!!');
    });
  });

  describe('DELETE /api/postsapps/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/postsapps/${newPostsapp._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when postsapp does not exist', function(done) {
      request(app)
        .delete(`/api/postsapps/${newPostsapp._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
