'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './admin.routes';

export class AdminController {
  users: Object[];
   $http;
  socket;
  avaposts = [];
  newpost = [];

  /*@ngInject*/
  constructor(User,$http, $scope, socket) {
    // Use the User $resource to fetch all users
    this.users = User.query();
     this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('admin');
    });
  }
  $onInit() {
    this.$http.get('/api/admin')
      .then(response => {
        this.avaposts= response.data;
        this.socket.syncUpdates('admin', this.avaposts);
      });
  }

  addPost() {
    if(this.newpost) {
      this.$http.post('/api/admin', {
        name: this.newpost.name,
        State:this.newpost.State,
        limitnumber:this.newpost.limitnumber
      });
      this.newpost ={};
    }
  }

  deletePost(posts) {
    this.$http.delete(`/api/admin/${posts._id}`);
  }

  toggleEdit(posts){

        posts.edit = !posts.edit;
   };     
 delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  savePost(posts){
        this.$http.put(`/api/admin/${posts._id}`,$posts);
                  }
  }
export default angular.module('jobappportalApp.admin', [uiRouter])
  .config(routes)
  .component('admin', {
    template: require('./admin.html'),
    controller: AdminController,
  })
  .name;
 

  

