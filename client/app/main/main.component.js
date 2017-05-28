import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  avaposts = [];
  isapply = [];
  isLoggedIn: Function;
  getCurrentUser: Function;
  isAdmin: Function;





  constructor($http, $scope, socket,Auth) {
        'ngInject';

    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.isAdmin = Auth.isAdminSync;


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
applyPost(posts){
      this.$http.post('/api/postsapps', {
        postid:posts._id,
        postname:posts.name,
        userid:(this.getCurrentUser()._id),
        username:(this.getCurrentUser().name)
    });
    }
  
}
  


export default angular.module('jobappportalApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;