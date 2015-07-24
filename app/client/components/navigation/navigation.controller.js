clientApp.controller('NavigationCtrl', ['$scope', '$location', '$state', 'User', function($scope, $location, $state, User) {
    $scope.viewUrl = '/client/components/navigation/navigation.view.html';
    $scope.User = User;

    $scope.isCurrentPage = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.logout = function() {
        User.logout();
        $state.go($state.current, {}, {reload: true});
    };
}]);
