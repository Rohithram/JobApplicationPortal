'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customerpage', {
      url: '/customerpage',
      template: '<customerpage></customerpage>',
      authenticate: true
    });
}
