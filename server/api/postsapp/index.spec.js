'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var postsappCtrlStub = {
  index: 'postsappCtrl.index',
  show: 'postsappCtrl.show',
  create: 'postsappCtrl.create',
  upsert: 'postsappCtrl.upsert',
  patch: 'postsappCtrl.patch',
  destroy: 'postsappCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var postsappIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './postsapp.controller': postsappCtrlStub
});

describe('Postsapp API Router:', function() {
  it('should return an express router instance', function() {
    expect(postsappIndex).to.equal(routerStub);
  });

  describe('GET /api/postsapps', function() {
    it('should route to postsapp.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'postsappCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/postsapps/:id', function() {
    it('should route to postsapp.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'postsappCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/postsapps', function() {
    it('should route to postsapp.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'postsappCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/postsapps/:id', function() {
    it('should route to postsapp.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'postsappCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/postsapps/:id', function() {
    it('should route to postsapp.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'postsappCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/postsapps/:id', function() {
    it('should route to postsapp.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'postsappCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
