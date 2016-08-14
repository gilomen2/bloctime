(function(){
  function TimerCtrl($scope, $interval, TimerFactory){
    $scope.buttonText = function(){
      if($scope.timer.session.state === "stopped" && $scope.timer.session.sessionType === "work" || $scope.timer.session.state === "running" && $scope.timer.session.sessionType === "break"){
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
