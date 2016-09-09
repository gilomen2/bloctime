(function(){
  function UserCtrl($scope, UserAuth){

    // $scope.user = {};

    $scope.linkText = "Sign In";

    $scope.signIn = function(){
      // UserAuth.signIn().then(function(result){
      //   $scope.$apply(function(){
      //     $scope.user = result.user;
      //   });
      // });
      UserAuth.signIn();
    };

    $scope.$on('UserAuth.userAuthenticated', function(){
      $scope.user = UserAuth.user;
      $scope.linkText = $scope.user.displayName;
    });

    // $scope.$watch('UserAuth.user', function(newVal, oldVal){
    //   if(!newVal.displayName){
    //     $scope.linkText = "Sign In";
    //   } else {
    //     $scope.linkText = newVal.displayName;
    //   }
    // }, true);
  };


  angular
    .module('bloctime')
    .controller('UserCtrl', ['$scope', 'UserAuth', UserCtrl]);
})();
