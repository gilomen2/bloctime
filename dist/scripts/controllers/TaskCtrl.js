(function(){
  function TaskCtrl($scope, UserAuth, UserTasks){

    $scope.user = {};

    $scope.tasks;

    $scope.updateUser = function(){
      $scope.user = UserAuth.user;
      $scope.tasks = firebase.database().ref('users/' + UserAuth.user.uid + '/tasks');
      $scope.tasks.on('child_added', function(data) {
        console.log(data.val().task_title);
      });
    };

    $scope.addTask = function(task){
      $scope.updateUser();
      UserTasks.createTask($scope.user.uid, task);
    };

    var displayTask = function(data){
      $('.user-tasks').append('<li>' + data + '</li>');
    }



    $scope.getTasks = function(){

    }

  };

  angular
    .module('bloctime')
    .controller('TaskCtrl', ['$scope', 'UserAuth', 'UserTasks', TaskCtrl]);
})();
