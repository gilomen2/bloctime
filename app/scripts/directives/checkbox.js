(function(){

  function checkbox($document){
    return {
      templateUrl: '../../templates/directives/checkbox.html',
      replace: true,
      restrict: 'E',
      scope: {
        task: "=taskData",
        ctrlMarkDone: '&callbackFn'
      },
      link: function(scope, element, attributes){
        var input = $(element);

        scope.markDone = function(task){
          $(element).fadeOut();
          scope.ctrlMarkDone({task: task});
        }

        // scope.addTask = function(){
        //   $(element).fadeIn();
        // }


      }
    }
  }

  angular
    .module('bloctime')
    .directive('checkbox', ['$document', checkbox]);

})();
