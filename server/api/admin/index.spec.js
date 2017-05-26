'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var adminCtrlStub = {
  index: 'adminCtrl.index',
  show: 'adminCtrl.show',
  create: 'adminCtrl.create',
  upsert: 'adminCtrl.upsert',
  patch: 'adminCtrl.patch',
  destroy: 'adminCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var adminIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './admin.controller': adminCtrlStub
});

describe('Admin API Router:', function() {
  it('should return an express router instance', function() {
    expect(adminIndex).to.equal(routerStub);
  });

  describe('GET /api/admins', function() {
    it('should route to admin.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'adminCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/admins/:id', function() {
    it('should route to admin.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'adminCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/admins', function() {
    it('should route to admin.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'adminCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/admins/:id', function() {
    it('should route to admin.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'adminCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/admins/:id', function() {
    it('should route to admin.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'adminCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/admins/:id', function() {
    it('should route to admin.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'adminCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
