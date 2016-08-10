(function(){
  function WorkSession(){
    var WorkSession = {};

    WorkSession.test = function(){
      console.log("hit it");
    };

    return WorkSession;
  };

  angular
    .module('bloctime')
    .factory('WorkSession', WorkSession);
})();
