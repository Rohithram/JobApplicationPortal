'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAdmin;

describe('Admin API:', function() {
  describe('GET /api/admins', function() {
    var admins;

    beforeEach(function(done) {
      request(app)
        .get('/api/admins')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          admins = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(admins).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/admins', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/admins')
        .send({
          name: 'New Admin',
          info: 'This is the brand new admin!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAdmin = res.body;
          done();
        });
    });

    it('should respond with the newly created admin', function() {
      expect(newAdmin.name).to.equal('New Admin');
      expect(newAdmin.info).to.equal('This is the brand new admin!!!');
    });
  });

  describe('GET /api/admins/:id', function() {
    var admin;

    beforeEach(function(done) {
      request(app)
        .get(`/api/admins/${newAdmin._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          admin = res.body;
          done();
        });
    });

    afterEach(function() {
      admin = {};
    });

    it('should respond with the requested admin', function() {
      expect(admin.name).to.equal('New Admin');
      expect(admin.info).to.equal('This is the brand new admin!!!');
    });
  });

  describe('PUT /api/admins/:id', function() {
    var updatedAdmin;

    beforeEach(function(done) {
      request(app)
        .put(`/api/admins/${newAdmin._id}`)
        .send({
          name: 'Updated Admin',
          info: 'This is the updated admin!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAdmin = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAdmin = {};
    });

    it('should respond with the updated admin', function() {
      expect(updatedAdmin.name).to.equal('Updated Admin');
      expect(updatedAdmin.info).to.equal('This is the updated admin!!!');
    });

    it('should respond with the updated admin on a subsequent GET', function(done) {
      request(app)
        .get(`/api/admins/${newAdmin._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let admin = res.body;

          expect(admin.name).to.equal('Updated Admin');
          expect(admin.info).to.equal('This is the updated admin!!!');

          done();
        });
    });
  });

  describe('PATCH /api/admins/:id', function() {
    var patchedAdmin;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/admins/${newAdmin._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Admin' },
          { op: 'replace', path: '/info', value: 'This is the patched admin!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAdmin = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAdmin = {};
    });

    it('should respond with the patched admin', function() {
      expect(patchedAdmin.name).to.equal('Patched Admin');
      expect(patchedAdmin.info).to.equal('This is the patched admin!!!');
    });
  });

  describe('DELETE /api/admins/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/admins/${newAdmin._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when admin does not exist', function(done) {
      request(app)
        .delete(`/api/admins/${newAdmin._id}`)
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
