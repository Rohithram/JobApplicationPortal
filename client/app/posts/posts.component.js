'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './posts.routes';



export class PostsComponent{
  $http;
  socket;
  avaposts = [];
  avaposts1=[];
  newpost = [];
  appliedusers=[];
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

  reset(){
    this.$http.get('/api/posts')
      .then(response => {
        this.avaposts = response.data;
        this.socket.syncUpdates('posts', this.avaposts);
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

  toggle(posts){
    clicked=!clicked;
  };
  
  toggleEdit(posts){
        posts.edit = !posts.edit;
   };     


  savePost(posts){
        this.$http.put(`/api/posts/${posts._id}`,{
              name:posts.name,
              State:posts.State,
              limitnumber:posts.limitnumber
          }).then((response)=>{this.reset(); });
 }


getusers(posts){
  this.$http.get(`/api/postsapps/posts/${posts._id}`)
      .then(response =>{
        this.appliedusers=response.data;
        this.socket.syncUpdates('postsapps', this.appliedusers);
      });

}

approve(user){
  this.$http.put(`/api/postsapps/user/${user.userid}/${user.postid}`,{
    status:"Selected,Congratulations!"
  })
  this.$http.get(`/api/posts/${user.postid}`)
    .then(response =>{
        this.avaposts1=response.data;
        this.socket.syncUpdates('posts', this.avaposts1);
      });
     
 this.$http.put(`/api/posts/${user.postid}`,{
      limitnumber:this.avaposts1.limitnumber-1
    })

}
reject(user){
  this.$http.put(`/api/postsapps/user/${user.userid}/${user.postid}`,{
    status:"Rejected,Better Luck next time"
  })
}
}

export default angular.module('jobappportalApp.posts', [uiRouter])
  .config(routes)
  .component('posts', {
    template: require('./posts.html'),
    controller: PostsComponent,
 })
  .name;
