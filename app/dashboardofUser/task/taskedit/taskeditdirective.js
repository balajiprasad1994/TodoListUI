'use strict';

angular.module('myApp.taskedit', ['ui.tree'])


.directive('taskEdit', [ function () {
	return {
		//priority: 0,
		//template: '<div></div>',
		templateUrl: '/dashboardofUser/task/taskedit/taskedittemplate.html',
		replace: true,
		//transclude: true,
		restrict: 'E',
		//scope: {},
		controller: ['$scope', '$http', function($scope, $http) {

			$scope.newName = "";

  			$scope.editclose = function(index,taskid){
  			console.log($scope);
	  		$http({method: "GET", url: "/Todolist/task/changen?id="+taskid+"&name="+$scope.newName})
		  		.then(function(){
			        $scope.tasks[index].taskName = $scope.newName.toString();
			        //$scope.editname = false;
			     	console.log($scope.tasks[index].taskName);
		      		$scope.setEditing(false);
		        //$scope.editedItems[$scope.edittaskid] = false;
		  		},
		  		function(){
		  	    	console.log("Could not change the name of task");
		  		});
			};

			$scope.cancelEditingGroup = function(){
	  			$scope.setEditing(false);
	  		//$scope.editedItems[$scope.edittaskid] = false;
			};
		}],
		/*compile: function compile(tElement, tAttrs, transclude) {
			return function postLink(scope, iElement, iAttrs, controller) {

			}
		},*/
		link: function postLink(scope, iElement, iAttrs) {

		}
	};
}]);