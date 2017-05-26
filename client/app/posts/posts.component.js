'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './posts.routes';



export class PostsComponent{
  $http;
  socket;
  avaposts = [];
  newpost = [];

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;

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

  toggleEdit(posts){

        posts.edit = !posts.edit;
   };     


  savePost(posts){
        this.$http.put(`/api/posts/${posts._id}`,$posts,{


        });
                  }}



export default angular.module('jobappportalApp.posts', [uiRouter])
  .config(routes)
  .component('posts', {
    template: require('./posts.html'),
    controller: PostsComponent,
 })
  .name;
