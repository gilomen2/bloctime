(function(){
  function UserCtrl($scope, UserAuth){

    $scope.user = {};

    $scope.signIn = function(){
      UserAuth.signIn().then(function(result){
        $scope.$apply(function(){
          $scope.user = result.user;
        });
      });
    };

    $scope.$watch('user', function(newVal, oldVal){
      if(!newVal.displayName){
        $scope.linkText = "Sign In";
      } else {
        $scope.linkText = newVal.displayName;
      }
    })
  };


  angular
    .module('bloctime')
    .controller('UserCtrl', ['$scope', 'UserAuth', UserCtrl]);
})();
