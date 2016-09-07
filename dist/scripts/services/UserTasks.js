(function(){
  function UserTasks(){
    var UserTasks = {};

    var database = firebase.database();

    var getUuid = function(){
      return "task_" + uuid.v1();
    };

    UserTasks.createTask = function(userId, task){
      var task_id = getUuid();
      var newTask = database.ref('users/' + userId + "/tasks").push({
          "task_title" : task
      });
      return newTask.key;
    };
    return UserTasks;
  }

  angular
    .module('bloctime')
    .factory('UserTasks', UserTasks);
})();
