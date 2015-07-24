clientApp
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'client/components/home/home.view.html',
            controller: 'HomeCtrl'
        })
        .state('car', {
            url: '/car',
            templateUrl: 'client/components/car/car.view.html',
            controller: 'CarCtrl'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: 'client/components/chat/chat.view.html',
            controller: 'ChatCtrl',
            authenticationRequired: true
        })
        .state('login', {
            url: '/login?redirectState',
            templateUrl: 'client/components/login/login.view.html',
            controller: 'LoginCtrl'
        });
}])
.run(['$rootScope', '$state', 'User', function ($rootScope, $state, User) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticationRequired && !User.isLoggedIn()){
            $state.go('login', {redirectState: toState.name});
            event.preventDefault();
        }
    });
}]);
