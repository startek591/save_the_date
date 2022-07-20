(function(){
  const app = angular.module('appRoutes', ['ngRoute']);
  app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: 'app/views/pages/home.html'
    })
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
  })
}());;