'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var postsCtrlStub = {
  index: 'postsCtrl.index',
  show: 'postsCtrl.show',
  create: 'postsCtrl.create',
  upsert: 'postsCtrl.upsert',
  patch: 'postsCtrl.patch',
  destroy: 'postsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var postsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './posts.controller': postsCtrlStub
});

describe('Posts API Router:', function() {
  it('should return an express router instance', function() {
    expect(postsIndex).to.equal(routerStub);
  });

  describe('GET /api/posts', function() {
    it('should route to posts.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'postsCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/posts/:id', function() {
    it('should route to posts.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'postsCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/posts', function() {
    it('should route to posts.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'postsCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/posts/:id', function() {
    it('should route to posts.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'postsCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/posts/:id', function() {
    it('should route to posts.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'postsCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/posts/:id', function() {
    it('should route to posts.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'postsCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
