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
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        // UserAuth.user = result.user;
        // return result;
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
