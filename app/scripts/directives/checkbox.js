(function(){

  function checkbox($document){
    return {
      templateUrl: '../../templates/directives/checkbox.html',
      replace: true,
      restrict: 'E',
      scope: {
        task: "=taskData"
      },
      link: function(scope, element, attributes){
        var input = $(element);

        scope.markDone = function(task){
          $(element).fadeOut();
        }


      }
    }
  }

  angular
    .module('bloctime')
    .directive('checkbox', ['$document', checkbox]);

})();
