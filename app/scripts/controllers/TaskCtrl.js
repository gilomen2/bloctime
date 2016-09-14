(function(){
  function TaskCtrl($scope, UserAuth, UserTasks){

    $scope.user = UserAuth.user;

    $scope.tasks = null;

    $scope.$on('UserAuth.userAuthenticated', function(){
      $scope.user = UserAuth.user;
      $scope.tasks = firebase.database().ref('users/' + $scope.user.uid + '/tasks');
      createTaskListener();
    });

    $scope.$on('UserAuth.userSignedOut', function(){
      $scope.user = null;
      $scope.tasks = null;
      clearTasks();
    });

    var createTaskListener = function(){
      return $scope.tasks.on('child_added', function(data) {
        console.log(data.val().task_title);
        displayTask(data.val().task_title);
      });
    };

    var clearTasks = function(){
      document.querySelector("#user-tasks").innerHTML = '';
    };

    $scope.addTask = function(task){
      UserTasks.createTask($scope.user.uid, task);
    };

    var displayTask = function(data){
      var el = document.createElement('li');
      el.innerHTML = data;
      document.querySelector("#user-tasks").appendChild(el);
    };
  };

  angular
    .module('bloctime')
    .controller('TaskCtrl', ['$scope', 'UserAuth', 'UserTasks', TaskCtrl]);
})();
