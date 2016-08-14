(function(){
  function TimerFactory($interval){
    var TimerFactory = {};

    function Timer(){
      var self = this;
      self.session = new Session("work", 1500);

      function Session(type, time){
        var self = this;
        self.time = time;
        self.sessionType = type;
        self.state = "stopped";
        var interval;

        self.start = function(){
          interval = $interval(decrementTime, 1000, self.time);
          self.state = "running";
        };

        self.stop = function(){
          $interval.cancel(interval);
        };

        var decrementTime = function(){
          self.time = self.time - 1;
        };
      };

      self.toggleTimer = function(){
        self.session.stop();
        if(self.session.sessionType === "work" && self.session.state === "stopped" || self.session.sessionType === "break" && self.session.state === "running"){
          self.session = new Session("work", 1500);
        } else {
          self.session = new Session("break", 300);
        }
        self.session.start();
      };

      self.reset = function(){
        self.session.stop();
        self.session.state = "stopped";
        if(self.session.sessionType === "work"){
          self.session = new Session("work", 1500);
        } else if(self.session.sessionType === "break") {
          self.session = new Session("break", 300);
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
