(function(){
  function UserTasks($rootScope){
    var UserTasks = {};

    var database = firebase.database();

    UserTasks.getTasks = function(userId){
      return database.ref('users/' + userId + '/tasks').once('value').then(function(snapshot){
        var snap = snapshot.val();
        var data = [];
        for (var key in snap) {
          data.push({
            id: key,
            title: snap[key].task_title
          });
        }
        console.log('UserTasks.getTasks promise')
        return data;
      });
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
