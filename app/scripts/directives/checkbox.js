(function(){

  function checkbox($document){
    return {
      templateUrl: '/templates/directives/checkbox.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes){
        var input = $(element);

        scope.markDone = function(task){
          
        }


      }
    }
  }

  angular
    .module('bloctime')
    .directive('checkbox', ['$document', checkbox]);

})();


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
