'use strict';

angular.module('car.controllers', [
  'car.services'
])
  .controller('CarCtrl', ['$scope', 'CarService', function($scope, carService) {
    carService.getAllCars()
      .then(function(cars) {
        $scope.cars = cars;
      }).finally(function() {
        $scope.isCarDataLoaded = true;
      });

    //Reference to Object not within scope, created this helper function
    $scope.util = {};
    $scope.util.isEmpty = function(obj) {
      return Object.keys(obj).length === 0;
    };

    $scope.createCar = function() {
      carService.createCar({description: $scope.carDescription})
        .then(function(car) {
          $scope.cars[car.id] = car;  //Add car with the id returned from server
        });
      $scope.carDescription = '';
    };

    $scope.deleteCar = function(car) {
      delete $scope.cars[car.id];
      carService.deleteCar(car);
    };

    $scope.updateCar = carService.updateCar;
  }]);
