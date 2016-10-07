(function(){
  function taskBar($document){
    return {
      templateUrl: '../../templates/directives/taskBar.html',
      replace: false,
      restrict: 'E',
      controller: 'TaskCtrl',
      controllerAs: 'ctrl',
      scope: {
        task: '=taskData',
      },
      link: function(scope, element, attributes){
        $('.button-collapse').sideNav({
          menuWidth: 450,
          edge: 'left'
        });
        $('.button-collapse').sideNav('hide');

        scope.title = "Tasks";

        scope.$on('UserAuth.userAuthenticated', function(){
          $('.button-collapse').sideNav('show');
          $('#sidenav-overlay').remove();
        });

        scope.$on('UserAuth.userSignedOut', function(){
          $('.button-collapse').sideNav('hide');
          $('.button-collapse').remove();
        });

        scope.markDone = function(task){
          scope.removeTask(task);
        };

        scope.addTask = function(task){
          scope.createTask(task);
          $('input#new_task').val('');
        };

        scope.$on('Task.taskRemoved', function(event, task){
          scope.updateUserTasks(task);
        });
      }
    }
  }

  angular
    .module('bloctime')
    .directive('taskBar', ['$document', taskBar]);
})();
