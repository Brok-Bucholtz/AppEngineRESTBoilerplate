clientApp.controller('LoginCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
    $scope.isAuthenticating = false;
    $scope.isLoginError = false;

    var redirectToStateOrDefault = function(redirectState) {
        if(redirectState) {
            $state.go(redirectState)
        } else {
            $state.go('home');
        }
    };

    $scope.authenticate = function(provider) {
        $scope.isAuthenticating = true;
        $scope.isLoginError = false;

        User.login(provider).then(function() {
            redirectToStateOrDefault($state.params.redirectState);
        }, function() {
            $scope.isLoginError = true;
        }).finally(function() {
            $scope.isAuthenticating = false;
        });
    };

    //Redirect them if they are authenticated
    if(User.isLoggedIn()) { redirectToStateOrDefault($state.params.redirectState); }
}]);
