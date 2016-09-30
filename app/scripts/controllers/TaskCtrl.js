(function(){
  function TaskCtrl($scope, UserAuth, UserTasks){

    $scope.user = UserAuth.user;

    $scope.firebaseTasks = null;

    $scope.userTasks = [];

    $scope.$on('UserAuth.userAuthenticated', function(){
      $scope.user = UserAuth.user;
      $scope.firebaseTasks = firebase.database().ref('users/' + $scope.user.uid + '/tasks');
      getTasks();
    });

    $scope.$on('UserAuth.userSignedOut', function(){
      $scope.user = null;
      $scope.firebaseTasks = null;
      clearTasks();
    });

    var getTasks = function(){
      UserTasks.getTasks($scope.user.uid).then(function(response){
        $scope.$apply(function(){
          $scope.userTasks = response;
        });
      });
    };

    var clearTasks = function(){
      document.querySelector("#user-tasks").innerHTML = '';
    };

    $scope.addTask = function(task){
      var newTask = UserTasks.createTask($scope.user.uid, task);
      $scope.userTasks.push(newTask);
      return task;
    };

    $scope.markDone = function(task){
      debugger;
      var i = $scope.userTasks.map(function(x){ return x.id; }).indexOf(task.id);
      $scope.userTasks.splice(i, 1);
      UserTasks.removeTask($scope.user.uid, task);
    };
  };

  angular
    .module('bloctime')
    .controller('TaskCtrl', ['$scope', 'UserAuth', 'UserTasks', TaskCtrl]);
})();
