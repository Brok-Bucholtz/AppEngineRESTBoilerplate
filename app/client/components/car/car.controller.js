clientApp.controller('CarCtrl', ['$scope', 'CarResource', function($scope, CarResource) {
    CarResource.query(function(response) {
        $scope.cars = {};
        angular.forEach(response.items, function(item) {
            var car = new CarResource();
            car.description = item.description;
            car.isSold = item.isSold;
            car.bought = item.bought;
            car.id = item.id;
            $scope.cars[car.id] = car;
        });
        $scope.isCarDataLoaded = true;
    });

    //Object not within scope, created this helper function
    $scope.isEmpty = function(obj) {
        return Object.keys(obj).length == 0;
    };

    $scope.addCar = function() {
        var car = new CarResource();
        car.description = $scope.carDescription;
        car.$save(function() {
            $scope.cars[car.id] = car;  //Add car with the id returned from server
        });

        $scope.carDescription = '';
    };

    $scope.removeCar = function(car) {
        delete $scope.cars[car.id];
        car.$remove();
    };

    $scope.updateCar = function(car) {
        car.$update();
    }
}]);
