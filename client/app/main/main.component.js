import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  avaposts = [];
  isLoggedIn: Function;
  getCurrentUser: Function;




  constructor($http, $scope, socket,Auth) {
        'ngInject';

    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedInSync;
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
applyPost(posts){
      this.$http.post('/api/postsapps', {
        postname:posts.name,
        userid:(this.getCurrentUser()._id),
        username:(this.getCurrentUser().name),
        status:""

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
