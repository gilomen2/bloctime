(function(){
  function UserAuth($rootScope){

    var UserAuth = {};

    UserAuth.user = {};

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        UserAuth.user = user;
        $rootScope.$broadcast('UserAuth.userAuthenticated');
      }
    });

    var provider = new firebase.auth.GoogleAuthProvider();

    UserAuth.signIn = function(){
      return firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        UserAuth.user = result.user;
        return result;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    return UserAuth;
  }

  angular
    .module('bloctime')
    .factory('UserAuth', ['$rootScope', UserAuth]);
})();
