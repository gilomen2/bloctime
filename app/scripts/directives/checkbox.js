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


        scope.$watchCollection('$parent.userTasks', function(newData, oldData){
          if(newData > oldData){
            var newIds = newData.map(function(x){ return x.id; });
            var oldSet = new Set(oldData.map(function(x){ return x.id; }));
            var difference = new Set(newIds.filter(function(x){return !oldSet.has(x)}));
            $(element).fadeIn();
          } else {
            var newIds = newData.map(function(x){ return x.id; });
            var oldSet = new Set(oldData.map(function(x){ return x.id; }));
            var difference = new Set(newIds.filter(function(x){return !oldSet.has(x)}));
            $(element).fadeIn();
          }
        });


      }
    }
  }

  angular
    .module('bloctime')
    .directive('checkbox', ['$document', checkbox]);

})();
