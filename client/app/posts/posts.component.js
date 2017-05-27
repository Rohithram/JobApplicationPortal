'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './posts.routes';



export class PostsComponent{
  $http;
  socket;
  avaposts = [];
  newpost = [];
    getCurrentUser: Function;


  constructor($http, $scope, socket,Auth) {
        'ngInject';

    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('posts');
    });
  }
  $onInit() {
    this.$http.get('/api/posts')
      .then(response => {
        this.avaposts= response.data;
        this.socket.syncUpdates('posts', this.avaposts);
      });
  }

  addPost() {
    if(this.newpost) {
      this.$http.post('/api/posts', {
        name: this.newpost.name,
        State:this.newpost.State,
        limitnumber:this.newpost.limitnumber
      });
      this.newpost ={};
    }
  }

  deletePost(posts) {
    this.$http.delete(`/api/posts/${posts._id}`);
  }

  toggleShow(posts){
    posts.show = !posts.show;
  };
  
  toggleEdit(posts){

        posts.edit = !posts.edit;
   };     


  savePost(posts){
        this.$http.put(`/api/posts/${posts._id}`,$posts,{
          edit:false


        });
                  }}



export default angular.module('jobappportalApp.posts', [uiRouter])
  .config(routes)
  .component('posts', {
    template: require('./posts.html'),
    controller: PostsComponent,
 })
  .name;
