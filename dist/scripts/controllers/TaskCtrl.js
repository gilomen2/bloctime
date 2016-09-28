(function(){
  function TaskCtrl($scope, UserAuth, UserTasks){

    $scope.user = UserAuth.user;

    $scope.firebaseTasks = null;

    $scope.userTasks = [];

    $scope.hello = "hi";

    $scope.$on('UserAuth.userAuthenticated', function(){
      $scope.user = UserAuth.user;
      $scope.firebaseTasks = firebase.database().ref('users/' + $scope.user.uid + '/tasks');
      createAddTaskListener();
      createRemoveTaskListener();
    });

    $scope.$on('UserAuth.userSignedOut', function(){
      $scope.user = null;
      $scope.firebaseTasks = null;
      clearTasks();
    });

    var createAddTaskListener = function(){
      return $scope.firebaseTasks.on('child_added', function(data) {
        var key = data.getKey();
        var val = data.val().task_title;
        $scope.$apply(function(){
          $scope.userTasks.push(
            {
              id: key,
              title: val
            }
          );
        })
      });
    };

    var createRemoveTaskListener = function(){
      return $scope.firebaseTasks.on('child_removed', function(data) {
        var key = data.getKey();
        var val = data.val().task_title;
        $scope.$apply(function(){
          var i = $scope.userTasks.map(function(x){ return x.id; }).indexOf(key);
          $scope.userTasks.splice(i, 1);
        });
      });
    };

    var clearTasks = function(){
      document.querySelector("#user-tasks").innerHTML = '';
    };

    $scope.addTask = function(task){
      UserTasks.createTask($scope.user.uid, task);
    };

    $scope.taskMarkDone = function(task){
      var i = $scope.userTasks.map(function(x){ return x.id; }).indexOf(task);
      $scope.userTasks.splice(i, 1);
      UserTasks.removeTask($scope.user.uid, task);
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
