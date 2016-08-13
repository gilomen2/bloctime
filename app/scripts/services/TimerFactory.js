(function(){
  function TimerFactory($interval){
    var TimerFactory = {};

    function Timer(){
      var self = this;
      self.title = "Whatever";
      self.time = 1500;
      self.state = "stopped";

      var interval;

      var startTimer = function(){
        interval = $interval(decrementTime, 1000);
        self.state = "running";
      };

      var stopTimer = function(int){
        $interval.cancel(int);
        self.state = "stopped";
      };

      var decrementTime = function(){
        self.time = self.time - 1;
      };

      self.toggleTimer = function(){
        if(self.state === "stopped" ) {
          startTimer();
        } else if(self.state === "running"){
          stopTimer(interval);
        } else {
          return null;
        }
      };
    };


    TimerFactory.create = function(){
      return new Timer();
    }

    return TimerFactory;
  }

  angular
    .module('bloctime')
    .factory('TimerFactory', ['$interval', TimerFactory]);
})();
