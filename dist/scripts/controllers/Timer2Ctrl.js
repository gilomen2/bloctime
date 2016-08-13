(function(){
  function Timer2Ctrl($scope, $interval, TimerFactory){
    $scope.buttonText = function(){
      if($scope.timer.state === "running"){
        return "Stop";
      } else if($scope.timer.state === "stopped"){
        return "Start";
      } else {
        return null;
      }
    };

    $scope.timer = TimerFactory.create();
  }

  angular
    .module('bloctime')
    .controller('Timer2Ctrl', ['$scope', '$interval', 'TimerFactory', Timer2Ctrl]);
})();
