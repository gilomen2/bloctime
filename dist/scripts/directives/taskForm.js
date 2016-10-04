(function(){
  function taskForm($document){
    return {
      templateUrl: '../../templates/directives/taskForm.html',
      replace: true,
      restrict: 'E',
      controller: 'TaskCtrl',
      scope: {
        task: "=taskData"
      },
      link: function(scope, element, attributes){
        scope.markDone = function(task){
          scope.removeTask(task);
        };

        scope.addTask = function(task){
          scope.createTask(task);
          $('input#new_task').val('');
        }

        scope.$on('Task.taskRemoved', function(event, task){
          scope.updateUserTasks(task);
        });
      }
    }
  }

  angular
    .module('bloctime')
    .directive('taskForm', ['$document', taskForm]);
})();
