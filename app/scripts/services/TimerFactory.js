(function(){
  function TimerFactory($interval){
    var TimerFactory = {};

    function Timer(){
      var timer = this;
      timer.session = new Session("work", 1500);
      timer.completedWorkSessions = 0;

      function Session(type, time){
        var self = this;
        self.time = time;
        self.sessionType = type;
        self.state = "stopped";
        var interval;

        self.start = function(){
          interval = $interval(decrementTime, 1000, self.time);
          interval.then(adjustCompletedSessions);
          self.state = "running";
        };

        self.stop = function(){
          $interval.cancel(interval);
        };

        var decrementTime = function(){
          self.time = self.time - 1;
        };

        var adjustCompletedSessions = function(){
          if(self.sessionType === "work"){
            timer.completedWorkSessions ++;
          }
        };
      };

      timer.toggleTimer = function(){
        timer.session.stop();
        if(timer.session.sessionType === "work" && timer.session.state === "stopped" || timer.session.sessionType === "break" && timer.session.state === "running"){
          timer.session = new Session("work", 1500);
        } else if(timer.completedWorkSessions === 4){
          timer.session = new Session("break", 1800);
          timer.completedWorkSessions = 0;
        }
        else {
          timer.session = new Session("break", 300);
        }
        timer.session.start();
      };

      timer.reset = function(){
        timer.session.stop();
        timer.session.state = "stopped";
        if(timer.session.sessionType === "work"){
          timer.session = new Session("work", 1500);
        } else if(timer.session.sessionType === "break") {
          timer.session = new Session("break", 300);
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
