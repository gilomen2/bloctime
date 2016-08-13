(function(){
  function TimerCtrl($scope, Session){
    $scope.title = "25:00";
    $scope.session = Session;
    $scope.timer = {
      timerState: "reset",
      buttonState: "Start"
    }
  }
  angular
    .module('bloctime')
    .controller('TimerCtrl', ['$scope', 'Session', TimerCtrl]);
})();
