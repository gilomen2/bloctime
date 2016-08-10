(function(){
  function TimerCtrl(WorkSession){
    this.title = "25:00";
    this.workSession = WorkSession;
  }
  angular
    .module('bloctime')
    .controller('TimerCtrl', ['WorkSession', TimerCtrl]);
})();
