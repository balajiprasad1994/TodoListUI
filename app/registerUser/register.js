'use strict';

angular.module('myApp.register', ['ngResource'])



.controller('regCtrl', ["$resource", '$scope', '$http', function login($resource,$scope,$http) {

$scope.user = {};
$scope.success=false;
$scope.register = function(){
	console.log($scope.user);
$http({method: "POST", url: "/Todolist/user/add", 
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {username: $scope.user.un, password: $scope.user.pw, firstname: $scope.user.fn, lastname: $scope.user.ln} 
})
.then(function(response) {
		  console.log(response);
          $scope.res = response.data;
          $scope.success = true;
        }, function(response) {
          $scope.res = response.data || "Request failed";
          console.log(response);
          $scope.success = false;
      });
};

}]);