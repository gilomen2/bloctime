(function(){
  function TaskCtrl($scope, UserAuth, UserTasks){

    $scope.user = {};

    $scope.addTask = function(task){
      $scope.user = UserAuth.user;
      UserTasks.createTask($scope.user.uid, task);
    };

    var displayTask = function(data){
      $('.user-tasks').append('<li>' + data + '</li>');
    }

    var tasks = firebase.database().ref('users/' + $scope.user.uid + '/tasks');
    tasks.on('child_added', function(data) {
      displayTask(data.val().text);
    });

    $scope.getTasks = function(){

    }

  };

  angular
    .module('bloctime')
    .controller('TaskCtrl', ['$scope', 'UserAuth', 'UserTasks', TaskCtrl]);
})();
