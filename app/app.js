'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute','myApp.login','myApp.register','myApp.dash','myApp.task'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  
  $routeProvider.when('/login', {
    templateUrl: 'loginUser/login.html',
    controller: 'loginCtrl'
  });

  $routeProvider.when('/register', {
    templateUrl: 'registerUser/register.html',
    controller: 'regCtrl'
  });

   $routeProvider.when('/dashboard', {
    templateUrl: 'dashboardofUser/dashboard.html',
    controller: 'dCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/login'});

  $locationProvider.html5Mode(true);


}])

.factory('userData', function() {
 var userSavedData = {};

 var set = function(data) {
  userSavedData = data;
 };

 var get = function() {
  return userSavedData;
 };

 return {
  set: set,
  get: get
 };

});

require('./loginUser/login.js');
require('./registerUser/register.js');
require('./dashboardofUser/dashboard.js');
require('./dashboardofUser/task/taskdirective.js');

