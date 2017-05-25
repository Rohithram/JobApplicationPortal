'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './posts.routes';

export class PostsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('jobappportalApp.posts', [uiRouter])
  .config(routes)
  .component('posts', {
    template: require('./posts.html'),
    controller: PostsComponent,
    controllerAs: 'postsCtrl'
  })
  .name;
