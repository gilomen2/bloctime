(function(){
  function TaskCtrl($scope, UserAuth, UserTasks){

    $scope.user = UserAuth.user;
    $scope.userTasks = [];

    $scope.$watch(function(newVal, oldVal){
      $scope.userTasks = newVal;
    })

    $scope.$on('UserAuth.userAuthenticated', function(){
      $scope.user = UserAuth.user;
      getTasks();
    });

    $scope.$on('UserAuth.userSignedOut', function(){
      $scope.user = null;
      $scope.userTasks = [];
      clearTasks();
    });

    var getTasks = function(){
      UserTasks.getTasks($scope.user.uid).then(function(snapshot){
        debugger;
        console.log(snapshot);
        var snap = snapshot.val();
        var data = [];
        for (var key in snap) {
          data.push({
            id: key,
            title: snap[key].task_title
          });
        }
        $scope.userTasks = data;
        debugger;
        $scope.$apply(function(){
          debugger;
          $scope.userTasks = data;
        });
      }).catch(function(reason){
        console.log(reason);
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
