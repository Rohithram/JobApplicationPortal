'use strict';

describe('Component: CustomerpageComponent', function() {
  // load the controller's module
  beforeEach(module('jobappportalApp.customerpage'));

  var CustomerpageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerpageComponent = $componentController('customerpage', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
