'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('posts', {
      url: '/posts',
      template: '<posts></posts>'
    });
}
