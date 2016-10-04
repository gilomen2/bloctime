(function(){
  function TaskCtrl($scope, UserAuth, UserTasks){

    $scope.user = UserAuth.user;
    $scope.userTasks = [];

    $scope.$on('UserAuth.userAuthenticated', function(){
      $scope.user = UserAuth.user;
      getTasks().then(function(response){
        $scope.$apply(function(){
          console.log('apply?')
          return $scope.userTasks = response;
        })
      });
    });

    $scope.$on('UserAuth.userSignedOut', function(){
      $scope.user = null;
      clearTasks();
    });

    var getTasks = function(){
      return UserTasks.getTasks($scope.user.uid).then(function(response){
        console.log('TaskCtrl getTasks promise')
        return response;
      });
    };

    var clearTasks = function(){
      document.querySelector("#user-tasks").innerHTML = '';
    };

    $scope.updateUserTasks = function(task){
      var i = $scope.userTasks.map(function(x){ return x.id; }).indexOf(task.id);
      return $scope.$apply(function(){
        $scope.userTasks.splice(i, 1);
      });
    };

    $scope.removeTask = function(task){
      UserTasks.removeTask($scope.user.uid, task);
    }

    $scope.createTask = function(task){
      var newTask = UserTasks.createTask($scope.user.uid, task);
      $scope.userTasks.push(newTask);
      return task;
    };
  };

  angular
    .module('bloctime')
    .controller('TaskCtrl', ['$scope', 'UserAuth', 'UserTasks', TaskCtrl]);
})();
