'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerpage.routes';

export class CustomerpageComponent {
   $http;
  socket;
  appliedposts = [];
  getCurrentUser: Function;
  
  constructor($http, $scope, socket,Auth) {
        'ngInject';

    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('postsapps');
    });
  }
  $onInit() {
    this.$http.get(`/api/postsapps/${this.getCurrentUser()._id}`)
      .then(response => {
        this.appliedposts= response.data;
        this.socket.syncUpdates('postsapps', this.appliedposts);
      });
      this.appliedposts={};
  }

 

  
}

export default angular.module('jobappportalApp.customerpage', [uiRouter])
  .config(routes)
  .component('customerpage', {
    template: require('./customerpage.html'),
    controller: CustomerpageComponent
  })
  .name;
