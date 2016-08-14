(function(){
  function TimerFactory($interval){
    var TimerFactory = {};

    function Timer(){
      var self = this;
      self.session = new WorkSession();
      self.state = "stopped";

      function WorkSession(){
        var self = this;
        self.time = 1500;
        self.sessionType = "work";
      }

      function BreakSession(){
        var self = this;
        self.time = 300;
        self.sessionType = "break";
      }

      var interval;

      var startSession = function(){
        interval = $interval(decrementTime, 1000, self.session.time);
        self.state = "running";
      };

      var decrementTime = function(){
        self.session.time = self.session.time - 1;
      };


      self.toggleTimer = function(){
        $interval.cancel(interval);
        if(self.session.sessionType === "work"){
          if(self.state === "stopped" ) {
            self.session = new WorkSession();
            startSession(self.session);
          } else if(self.state === "running"){
            self.session = new BreakSession();
            startSession(self.session);
          }
        }
        else if(self.session.sessionType === "break"){
          if(self.state === "stopped"){
            self.session = new BreakSession();
            startSession();
          } else if(self.state === "running"){
            self.session = new WorkSession();
            startSession();
          }
        }
      };

      self.reset = function(){
        $interval.cancel(interval);
        self.state = "stopped";
        if(self.session.sessionType === "work"){
          self.session = new WorkSession();
        } else if(self.session.sessionType === "break") {
          self.session = new BreakSession();
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
