'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.login', ['ngResource'])




.controller('loginCtrl', ['$location','userData', '$scope', '$http', function login($location, userData, $scope, $http) {

$scope.user={};
$scope.success=true;

$http({method: "GET", url: "/Todolist/user/checksession", headers: {'Access-Control-Allow-Origin':'*'}})
.then(function(response) {
          console.log(response);
          $scope.checksession = response.data;
          console.log($scope.checksession);
          if($scope.checksession != -99){
            console.log($scope.checksession);
            $location.path('/dashboard');
          } 
        }, function(response) {
          console.log(response);
      });

/*var User = $resource('/Todolist/user/checksession',{}, {
    get: {
        method: 'GET'
      }});
User.get({},function(response) {
          console.log(response);
          $scope.checksession = response.data;
          console.log($scope.checksession);
          if($scope.checksession === true){
            console.log($scope.checksession);
            $location.path('/dashboard');
          } 
        }, function(response) {
          console.log(response);
      });*/

$scope.login = function(){
	console.log($scope.user);

$http({method: "POST", url: "/Todolist/user/login", 
	headers: {'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'},
	transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {uname: $scope.user.un, pword:$scope.user.pw}
})
.then(function(response) {
		      console.log(response);
          $scope.res = response.data;
          userData.set($scope.res);
          console.log($scope.res.username);
          if(typeof $scope.res.username === "string"){
            console.log($scope.res.username);
            $location.path('/dashboard');
          } 
          else{
            $scope.success = false;
          }
        }, function(response) {
          console.log(response);
      });

/*var Usertwo = $resource( '/Todolist/user/login', {}, {
    save: {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }
    }
});
Usertwo.save({uname: $scope.user.un, pword:$scope.user.pw},function(response) {
         console.log(response);
          $scope.res = response;
          console.log($scope.res.username);
          if(typeof $scope.res.username === "string"){
            console.log($scope.res.username);
            $location.path('/dashboard');
          } 
          else{
            $scope.success = false;
          }
        }, function(response) {
          console.log(response);
      });*/
   
};

}]);

