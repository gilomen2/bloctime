(function(){
  function TimerCtrl($scope, $interval, TimerFactory){
    $scope.buttonText = function(){
      if($scope.timer.state === "stopped" && $scope.timer.sessionType === "work"){
        return "Start Work";
      } else if($scope.timer.state === "running" && $scope.timer.sessionType === "work"){
        return "Start Break";
      } else if($scope.timer.state === "stopped" && $scope.timer.sessionType === "break"){
        return "Start Break";
      } else if($scope.timer.state === "running" && $scope.timer.sessionType === "break"){
        return "Start Work";
      } else {
        return null;
      }
    };

    $scope.timer = TimerFactory.create();
  }

  angular
    .module('bloctime')
    .controller('TimerCtrl', ['$scope', '$interval', 'TimerFactory', TimerCtrl]);
})();
