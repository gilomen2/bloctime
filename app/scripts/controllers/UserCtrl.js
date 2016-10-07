(function(){
  function UserCtrl($scope, UserAuth){

    $scope.user = UserAuth.user;

    $scope.linkText = $scope.user ? "Sign Out" : "Sign In";

    $scope.signIn = function(){
      UserAuth.signIn();
    };

    $scope.signOut = function(){
      UserAuth.signOut();
    };

    $scope.$on('UserAuth.userAuthenticated', function(){
      console.log("UserAuthenticated");
      $scope.user = UserAuth.user;
      $scope.$apply(function(){
        $scope.linkText = "Sign Out";
      });
    });

    $scope.$on('UserAuth.userSignedOut', function(){
      console.log("UserSignedOut");
      $scope.user = null;
      $scope.$apply(function(){
        $scope.linkText = "Sign In";
      });
    })

  }


  angular
    .module('bloctime')
    .controller('UserCtrl', ['$scope', 'UserAuth', UserCtrl]);
})();
