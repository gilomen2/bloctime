(function(){
  function TimerCtrl($scope, $interval, BadTimerService){
    $scope.buttonText = function(){
      if($scope.timer.state === "running"){
        return "Stop";
      } else if($scope.timer.state === "stopped"){
        return "Start";
      } else {
        return null;
      }
    };

    $scope.timer = BadTimerService;
  }

  angular
    .module('bloctime')
    .controller('TimerCtrl', ['$scope', '$interval', 'BadTimerService', TimerCtrl]);
})();
