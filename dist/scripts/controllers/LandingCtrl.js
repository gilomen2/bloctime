(function(){
  function LandingCtrl(){
    this.title = "Hello world!"
  }

  angular
    .module('bloctime')
    .controller('LandingCtrl', LandingCtrl)
})();
