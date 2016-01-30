'use strict';

angular.module('myApp.task', ['myApp.taskpreview','myApp.taskedit','ui.tree'])


.directive('taskTag',function () {
	return {
		//priority: 0,
		//template: '<div></div>',
		templateUrl: '/dashboardofUser/task/tasktemplate.html',
		replace: true,
		//transclude: true,
		restrict: 'E',
		//scope: {},
		controller: ['$scope', function($scope) {
			$scope.editing = false;
			$scope.setEditing = function(arg){
				$scope.editing = arg;
			};
			$scope.getEditing = function(){
				return $scope.editing;
			};
		}],
		/*compile: function compile(tElement, tAttrs, transclude) {
			return function postLink(scope, iElement, iAttrs, controller) {

			}$scope
, 		},*/
		link: function postLink(scope, iElement, iAttrs) {

		}
	};
});

require('./taskpreview/taskpreviewdirective.js');
require('./taskedit/taskeditdirective.js');

