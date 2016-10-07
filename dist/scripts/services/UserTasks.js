(function(){
  function UserTasks($rootScope){
    var UserTasks = {};

    var database = firebase.database();

    UserTasks.retrieveFirebaseTasks = function(userId){
      return database.ref('users/' + userId + '/tasks').once('value');
    };

    UserTasks.createTask = function(userId, task){
      var taskObj = {};
      var newTask = database.ref('users/' + userId + '/tasks').push({
          "task_title" : task
      });

      taskObj.id = newTask.key;
      taskObj.title = task;
      return taskObj;
    };

    UserTasks.removeTask = function(userId, task){
      return database.ref('users/' + userId + '/tasks/' + task.id).remove().then(function(){
        $rootScope.$broadcast('Task.taskRemoved', task);
      });
    };

    return UserTasks;
  }

  angular
    .module('bloctime')
    .factory('UserTasks', ['$rootScope', UserTasks]);
})();
