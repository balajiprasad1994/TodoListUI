'use strict';

angular.module('myApp.taskpreview', ['ui.tree'])


.directive('taskPreview', [function () {
	return {
		//priority: 0,
		//template: '<div></div>',
		templateUrl: '/dashboardofUser/task/taskpreview/taskpreviewtemplate.html',
		replace: true,
		//transclude: true,
		restrict: 'E',
		//scope: {},
		controller: ['$scope', '$http', function($scope, $http) {
		//$scope.editing = false;
		$scope.showaddtag = false;
		$scope.showaddcategory = false;
		$scope.tagName = "";
		$scope.categoryName = "";

		/*$scope.markcomplete = function(index,taskid,taskname){
		console.log("task index :"+index+" task id "+taskid+" task name :"+taskname);
		$http({method: "GET", url: "/Todolist/task/delete?id="+taskid})
  		.then(function(){
    		$scope.tasks.splice(index,1);
    		$scope.deleteTagsForTaskId();
    		$scope.deleteCategoriesForTaskId();
    		$scope.markedtasks.push(taskname);
		  	},function(){
		    console.log("Could not mark the task");
		  	});
		};*/

		$scope.markcomplete = function(index,task){
		console.log("task index :"+index+" task id "+task.id);
		$http({method: "GET", url: "/Todolist/task/toggle?id="+task.id+"&mark="+true})
  		.then(function(){
    		$scope.tasks.splice(index,1);
    		$scope.markedtasks.push(task);
		  	},function(){
		    console.log("Could not mark the task");
		  	});
		};

		$scope.delete = function(index,taskid){
 	    console.log("Inside delete task function");

  		$http({method: "GET", url: "/Todolist/task/delete?id="+taskid})
  		.then(function(){
    		$scope.tasks.splice(index,1);
    		$scope.deleteTagsForTaskId();
    		$scope.deleteCategoriesForTaskId();
    		$scope.setEditing(false);
		  	},function(){
		    console.log("Could not delete task");
		  	});
		};

		$scope.deleteTagsForTaskId = function() {
			$http({
			  method: "GET", 
			  url: "/Todolist/user/loadtags?id="+$scope.checksession 

			})
            .then(function(response) {
              $scope.$treeScope.$parent.alltags = response.data;
               console.log($scope);

            }, function(response){
              console.log(response);
            });
		};

		$scope.deleteCategoriesForTaskId = function(){
			$http({
			  method: "GET", 
			  url: "/Todolist/user/loadcategory?id="+$scope.checksession 

			})
            .then(function(response) {

              $scope.$treeScope.$parent.allcategories = response.data;

            }, function(response){
              console.log(response);
            });
		};
		
		$scope.enableaddtag = function(){
  			$scope.showaddtag = true;
		};

		$scope.enableaddcategory = function(){
  			$scope.showaddcategory = true;
		};

		$scope.addtagtotask = function(taskid){
			$scope.taskidfortag = taskid;
			$http({
			  method: "POST", 
			  url: "/Todolist/tag/add", 
			  headers: {'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'},
			  transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			  },
			  data: {name: $scope.tagName,tids: $scope.taskidfortag.toString()}})
			  .then(function(response) {
              $scope.$treeScope.$parent.alltags.push(response.data);
              $scope.showaddtag = false;
            }, function(response){
              console.log(response);
            });
		};

		$scope.addcategorytotask = function(taskid){
			$scope.taskidforcategory = taskid;
			$http({
			  method: "POST", 
			  url: "/Todolist/category/add", 
			  headers: {'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'},
			  transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			  },
			  data: {name: $scope.categoryName,tids: $scope.taskidforcategory.toString()}})
			  .then(function(response) {
			  console.log($scope);
              $scope.$treeScope.$parent.allcategories.push(response.data);
              $scope.showaddcategory = false;
            }, function(response){
              console.log(response);
            });
		};

		$scope.cancelAddingTag = function(){
			$scope.showaddtag = false;
		};

		$scope.cancelAddingCategory = function(){
			$scope.showaddcategory = false;
		};

		$scope.edit = function(){
 		// $scope.editname = true;
   		$scope.setEditing(true);
  	/*	$scope.editindex = index;
  		$scope.edittaskid = taskid;*/
  		//$scope.editedItems[taskid] = !$scope.editedItems[taskid] || true;

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