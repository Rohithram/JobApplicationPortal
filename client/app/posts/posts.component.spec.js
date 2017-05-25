'use strict';

describe('Component: PostsComponent', function() {
  // load the controller's module
  beforeEach(module('jobappportalApp.posts'));

  var PostsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PostsComponent = $componentController('posts', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
