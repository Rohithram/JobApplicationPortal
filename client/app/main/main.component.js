import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  avaposts = [];
  newpost = [];
  isLoggedIn: Function;



  /*@ngInject*/
  constructor($http, $scope, socket,Auth) {
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedInSync;

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

  applyPost() {
    if(this.newpost) {
      this.$http.post('/api/posts', {
        name: this.newpost.name,
        State:this.newpost.State,
        limitnumber:this.newpost.limitnumber
      });
      this.newpost ={};
    }
  }
}
  


export default angular.module('jobappportalApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
