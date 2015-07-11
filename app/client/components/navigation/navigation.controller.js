clientApp.controller("NavigationCtrl", ["$scope", "$location", function($scope, $location) {
    $scope.viewUrl = "/client/components/navigation/navigation.view.html";

    $scope.isCurrentPage = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);
