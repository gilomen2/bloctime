(function(){
  function TimerCtrl($scope, $interval, TimerFactory){
    $scope.buttonText = function(){
      if($scope.timer.state === "stopped" && $scope.timer.sessionType === "work" || $scope.timer.state === "running" && $scope.timer.sessionType === "break"){
        return "Start Work";
      } else {
        return "Start Break";
      }
    };

    $scope.timer = TimerFactory.create();
  }

  angular
    .module('bloctime')
    .controller('TimerCtrl', ['$scope', '$interval', 'TimerFactory', TimerCtrl]);
})();
