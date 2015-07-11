clientApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller : 'HomeCtrl',
        templateUrl: 'client/components/home/home.view.html'
    });
    $routeProvider.when('/car', {
        controller : 'CarCtrl',
        templateUrl: 'client/components/car/car.view.html'
    });
    $routeProvider.otherwise({
        redirectTo : '/'
    });

    $locationProvider.html5Mode(true);
}]);
