(function(){
  function UserTasks(){
    var UserTasks = {};

    var database = firebase.database();

    var getUuid = function(){
      return "task_" + uuid.v1();
    };

    UserTasks.createTask = function(userId, task){
      var newTask = database.ref('users/' + userId + "/tasks").push({
          "task_title" : task
      });
      return newTask.key;
    };

    UserTasks.removeTask = function(userId, task){
      database.ref('users/' + userId + "/tasks/" + task.id).remove().then(function(){
        console.log('Removed!');
      });
    };
    return UserTasks;
  }

  angular
    .module('bloctime')
    .factory('UserTasks', UserTasks);
})();
