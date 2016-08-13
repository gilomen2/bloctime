(function(){
  function Timer2Ctrl($scope, $interval){
    $scope.title = "Whatever";
    $scope.time = 1500;
    $scope.state = "stopped";
    $scope.buttonText = "Start"
    var interval;
    $scope.startTimer = function(){
      interval = $interval(decrementTime, 1000);
      $scope.state = "running";
      $scope.buttonText = "Stop";
    };

    $scope.stopTimer = function(int){
      $interval.cancel(int);
      $scope.state = "stopped";
      $scope.buttonText = "Start";
    }

    $scope.toggleTimer = function(){
      if($scope.state === "stopped" ) {
        $scope.startTimer();
      } else if($scope.state === "running"){
        $scope.stopTimer(interval);
      } else {
        return null;
      }
    }

    var decrementTime = function(){
      $scope.time = $scope.time - 1;
    };
  }
  angular
    .module('bloctime')
    .controller('Timer2Ctrl', ['$scope', '$interval', Timer2Ctrl]);
})();
