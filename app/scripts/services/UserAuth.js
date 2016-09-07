(function(){
  function UserAuth(){

    var UserAuth = {};

    UserAuth.user = null;

    var provider = new firebase.auth.GoogleAuthProvider();

    UserAuth.signIn = function(){
      return firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        UserAuth.user = result.user;
        console.log(result.user);
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
    .factory('UserAuth', UserAuth);
})();
