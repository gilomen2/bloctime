(function(){
  function TaskCtrl($scope, UserAuth, UserTasks){

    $scope.user = {};

    $scope.tasks;

    $scope.tasks = firebase.database().ref('users/' + UserAuth.user.uid + '/tasks');
    $scope.tasks.on('child_added', function(data) {
      console.log(data.val().task_title);
      displayTask(data.val().task_title);

    });

    $scope.addTask = function(task){
      UserTasks.createTask($scope.user.uid, task);
    };

    var displayTask = function(data){
      var el = document.createElement('li');
      el.innerHTML = data;
      document.querySelector("#user-tasks").appendChild(el);
    }



    $scope.getTasks = function(){

    }

  };

  angular
    .module('bloctime')
    .controller('TaskCtrl', ['$scope', 'UserAuth', 'UserTasks', TaskCtrl]);
})();
