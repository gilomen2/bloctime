(function(){
  function Session(scope){
    var Session = {};

    Session.setState = function(state){
      if(state === "running"){
        scope.timerState = "running";
        scope.buttonState = "Take a Break";
      } else if (state === "reset") {
        scope.timerState = "reset";
        scope.buttonState = "Start";
      } else if (state === "onBreak") {
        scope.timerState = "onBreak";
        scope.buttonState = "Reset";
      } else {
        scope.timerState = "reset";
        scope.buttonState = "Start";
      }
    };

    Session.start = function(){
      Session.setState("running");
    };

    Session.reset = function(){
      Session.setState("reset");
    };

    Session.break = function(){
      Session.setState("onBreak");
    };

    Session.toggleState = function(state){
      if(state === "reset") {
        Session.start();
      } else if(state === "running") {
        Session.break();
      } else if(state === "onBreak") {
        Session.reset();
      } else {
        Session.start();
      }
    };

    return Session;
  };

  angular
    .module('bloctime')
    .factory('Session', Session);
})();
