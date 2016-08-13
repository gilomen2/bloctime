(function(){
  function TimerFactory($interval){
    var TimerFactory = {};

    function Timer(){
      var self = this;
      self.time = 1500;
      self.state = "stopped";
      self.sessionType = "work";
      self.session = null;

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

      var startWorkSession = function(session){
        var session = session;
        interval = $interval(decrementTime, 1000);
        self.time = session.time;
        self.state = "running";
        self.sessionType = session.sessionType;
      };

      var startBreakSession = function(session){
        var session = session;
        interval = $interval(decrementTime, 1000);
        self.time = session.time;
        self.state = "running";
        self.sessionType = session.sessionType;
      };

      var decrementTime = function(){
        self.time = self.time - 1;
      };

      self.toggleTimer = function(){
        clearInterval(interval);
        if(self.sessionType === "work"){
          if(self.state === "stopped" ) {
            self.session = new WorkSession();
            startWorkSession(self.session);
          } else if(self.state === "running"){
            self.session = new BreakSession();
            startBreakSession(self.session);
          }
        }
        else if(self.sessionType === "break"){
          if(self.state === "stopped"){
            self.session = new BreakSession();
            startBreakSession(self.session);
          } else if(self.state === "running"){
            self.session = new WorkSession();
            startWorkSession(self.session);
          }
        }
      };

      var clearInterval = function(int){
        $interval.cancel(int);
      };

      self.reset = function(){
        clearInterval(interval);
        self.session = null;
        self.state = "stopped";
        if(self.sessionType === "work"){
          self.session = new WorkSession();
        } else if(self.sessionType === "break") {
          self.session = new BreakSession();
        }
        self.time = self.session.time;
        self.sessionType = self.session.sessionType;

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
