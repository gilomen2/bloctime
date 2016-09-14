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
        displayTask(data.getKey(), data.val().task_title);
      });
    };

    var clearTasks = function(){
      document.querySelector("#user-tasks").innerHTML = '';
    };

    $scope.addTask = function(task){
      UserTasks.createTask($scope.user.uid, task);
    };

    var displayTask = function(key, value){
      var li = document.createElement('li');
      li.id = "li-" + key;
      li.className += "hidden";
      var el = document.createElement('input');
      el.type = "checkbox";
      el.id = key;
      var label = document.createElement('label');
      label.htmlFor = key;
      label.innerHTML = value;
      li.appendChild(el);
      li.appendChild(label);
      document.querySelector("#user-tasks").appendChild(li);
      document.querySelector("#li-" + key).className = "animated fadeIn";
    };
  };

  angular
    .module('bloctime')
    .controller('TaskCtrl', ['$scope', 'UserAuth', 'UserTasks', TaskCtrl]);
})();
