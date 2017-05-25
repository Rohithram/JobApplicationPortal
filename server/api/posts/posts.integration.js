'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPosts;

describe('Posts API:', function() {
  describe('GET /api/posts', function() {
    var postss;

    beforeEach(function(done) {
      request(app)
        .get('/api/posts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          postss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(postss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/posts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/posts')
        .send({
          name: 'New Posts',
          info: 'This is the brand new posts!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPosts = res.body;
          done();
        });
    });

    it('should respond with the newly created posts', function() {
      expect(newPosts.name).to.equal('New Posts');
      expect(newPosts.info).to.equal('This is the brand new posts!!!');
    });
  });

  describe('GET /api/posts/:id', function() {
    var posts;

    beforeEach(function(done) {
      request(app)
        .get(`/api/posts/${newPosts._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          posts = res.body;
          done();
        });
    });

    afterEach(function() {
      posts = {};
    });

    it('should respond with the requested posts', function() {
      expect(posts.name).to.equal('New Posts');
      expect(posts.info).to.equal('This is the brand new posts!!!');
    });
  });

  describe('PUT /api/posts/:id', function() {
    var updatedPosts;

    beforeEach(function(done) {
      request(app)
        .put(`/api/posts/${newPosts._id}`)
        .send({
          name: 'Updated Posts',
          info: 'This is the updated posts!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPosts = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPosts = {};
    });

    it('should respond with the updated posts', function() {
      expect(updatedPosts.name).to.equal('Updated Posts');
      expect(updatedPosts.info).to.equal('This is the updated posts!!!');
    });

    it('should respond with the updated posts on a subsequent GET', function(done) {
      request(app)
        .get(`/api/posts/${newPosts._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let posts = res.body;

          expect(posts.name).to.equal('Updated Posts');
          expect(posts.info).to.equal('This is the updated posts!!!');

          done();
        });
    });
  });

  describe('PATCH /api/posts/:id', function() {
    var patchedPosts;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/posts/${newPosts._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Posts' },
          { op: 'replace', path: '/info', value: 'This is the patched posts!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPosts = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPosts = {};
    });

    it('should respond with the patched posts', function() {
      expect(patchedPosts.name).to.equal('Patched Posts');
      expect(patchedPosts.info).to.equal('This is the patched posts!!!');
    });
  });

  describe('DELETE /api/posts/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/posts/${newPosts._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when posts does not exist', function(done) {
      request(app)
        .delete(`/api/posts/${newPosts._id}`)
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
