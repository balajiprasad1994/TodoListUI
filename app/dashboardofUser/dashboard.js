'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.dash', ['ngResource','ui.tree'])



.controller('dCtrl', ['userData', '$location', '$scope', '$http', function dash(userData, $location, $scope, $http) {

$scope.tasks={};
$scope.alltags={};
$scope.allcategories={};
$scope.markedtasks=[];
$scope.editname = false;
$scope.showadd = false;
$scope.editing = false;
$scope.newName = "";
$scope.addTaskName = "";
$scope.editedItems = {};

$http({method: "GET", url: "/Todolist/user/checksession"})
.then(function(response) {
          console.log(response);
          $scope.checksession = response.data;
          console.log($scope.checksession);
          if($scope.checksession != -99){
            console.log($scope.checksession);
            $location.path('/dashboard');
            loadTasks($scope.checksession);
            loadMarkedTasks($scope.checksession);
            loadTagsofUser($scope.checksession);
            loadCategoriesofUser($scope.checksession);
          } 
          else{
            $location.path('/login');
          }
        }, function(response) {
          console.log(response);
      });


var loadMarkedTasks = function(userId){
     $http({
          method: "GET", 
          url: "/Todolist/user/loadmtasks?id="+userId 

      })
      .then(function(response) {
          $scope.markedtasks = response.data;

      }, function(response){
              console.log(response);
      });
};
var loadTasks = function(userId){
$scope.userDashboard = userData.get();
$http({
  method: "GET", 
  url: "/Todolist/user/loadtasks?id="+userId 

})
            .then(function(response) {
              $scope.tasks = response.data;

            }, function(response){
              console.log(response);
            });
          };

var loadTagsofUser = function(userId){
$scope.userDashboard = userData.get();
console.log($scope.userDashboard.id);
$http({
  method: "GET", 
  url: "/Todolist/user/loadtags?id="+userId 

})
            .then(function(response) {
              $scope.alltags = response.data;

            }, function(response){
              console.log(response);
            });
          };

var loadCategoriesofUser = function(userId){
$scope.userDashboard = userData.get();
console.log($scope.userDashboard.id);
$http({
  method: "GET", 
  url: "/Todolist/user/loadcategory?id="+userId 

})
            .then(function(response) {
              $scope.allcategories = response.data;

            }, function(response){
              console.log(response);
            });
          };


$scope.deleteMarkedTask = function(index,taskid){
  $http({method: "GET", url: "/Todolist/task/delete?id="+taskid})
      .then(function(){
        $scope.markedtasks.splice(index,1);
        loadTagsofUser($scope.checksession);
        loadCategoriesofUser($scope.checksession);
        $scope.setEditing(false);
        },function(){
        console.log("Could not delete task");
        });
};

$scope.unmarktask = function(index,task){
 
 $http({method: "GET", url: "/Todolist/task/toggle?id="+task.id+"&mark="+false})
      .then(function(){
        $scope.markedtasks.splice(index,1);
        $scope.tasks.push(task);
        },function(){
        console.log("Could not unmark the task");
        });
  //loadTagsofUser($scope.checksession);
  //loadCategoriesofUser($scope.checksession);
};
/*$scope.delete = function(index,taskid){
  console.log("Inside delete task function");

  $http({method: "GET", url: "/Todolist/task/delete?id="+taskid})
  .then(function(){
    $scope.tasks.splice(index,1);
    $scope.editname = false;

  },function(){
    console.log("Could not delete task");
  });
}

$scope.edit = function(index,taskid){
 // $scope.editname = true;
   $scope.editing = true;
  $scope.editindex = index;
  $scope.edittaskid = taskid;
  $scope.editedItems[taskid] = !$scope.editedItems[taskid] || true;

}

$scope.editclose = function(){
  console.log($scope);
  $http({method: "GET", url: "/Todolist/task/changen?id="+$scope.edittaskid+"&name="+$scope.newName})
  .then(function(){
      $scope.tasks[$scope.editindex].taskName = $scope.newName.toString();
      //$scope.editname = false;
      console.log($scope.tasks[$scope.editindex].taskName);
      $scope.editing = false;
      $scope.editedItems[$scope.edittaskid] = false;
  },function(){
    console.log("Could not change the name of task");
  });
}

$scope.cancelEditingGroup = function(){
  $scope.editing = false;
  $scope.editedItems[$scope.edittaskid] = false;
}
*/
$scope.add = function(){
  $scope.showadd = true;
};

$scope.addtask = function(){
  $http({
  method: "POST", 
  url: "/Todolist/task/add", 
  headers: {'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'},
  transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
  },
  data: {task_name: $scope.addTaskName,user_id: $scope.checksession}})
  .then(function(response){
     // $location.path('/dashboard');
     $scope.showadd = false;
     console.log(response);
     $scope.taskadded = response.data;
     console.log($scope.taskadded);
     console.log($scope.taskadded.taskName);
     $scope.tasks.push($scope.taskadded);
  },function(response) {
          console.log("Task addition failed : "+ response);
  });

   
};

$scope.logout = function(){
  console.log("Inside logout function");

  $http({method: "GET", url: "/Todolist/user/logout"});
  $location.path('/login');
};

}]);