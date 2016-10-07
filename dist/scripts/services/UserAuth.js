(function(){
  function UserAuth($rootScope){

    var UserAuth = {};

    UserAuth.user = firebase.auth().currentUser !== null ? firebase.auth().currentUser : null;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        UserAuth.user = user;
        $rootScope.$broadcast('UserAuth.userAuthenticated');
      } else {
        UserAuth.user = null;
        $rootScope.$broadcast('UserAuth.userSignedOut');
      }
    });

    var provider = new firebase.auth.GoogleAuthProvider();

    UserAuth.signIn = function(){
      return firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    };

    UserAuth.signOut = function(){
      firebase.auth().signOut().then(function() {
        $rootScope.$broadcast('UserAuth.userSignedOut');
      }, function(error) {
        alert("Whoops!");
      });
    };

    return UserAuth;
  }

  angular
    .module('bloctime')
    .factory('UserAuth', ['$rootScope', UserAuth]);
})();
