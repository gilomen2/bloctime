(function(){
  function config($stateProvider, $locationProvider){
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    $stateProvider
      .state('landing', {
        url: '/',
        controller: 'LandingCtrl as landing',
        templateUrl: '/templates/landing.html'
      });
    $('.button-collapse').sideNav({
      menuWidth: 450,
      edge: 'left',
      closeOnClick: true
    });
  }

  angular
    .module('bloctime', ['ui.router', 'firebase', 'ui.materialize', 'ngAnimate'])
    .config(config);
})();
