'use strict';

describe('login controller', function() {
    beforeEach(module('login.controllers'));

    var $scope = null,
        $state = null,
        loginCtrl = null,
        mockUserServ = null,
        testUser = {};


    beforeEach(inject(function ($controller, $rootScope, $q){
        $scope = $rootScope.$new();

        mockUserServ = jasmine.createSpyObj('UserService', ['login', 'isLoggedIn']);
        mockUserServ.login.and.returnValue($q.when(testUser));

        loginCtrl = $controller('LoginCtrl', {
            $scope: $scope,
            $state: $state,
            UserService: mockUserServ
        });
        $scope.$digest();
    }));

    it('should redirect to / after login by default', function(){

    });

    it('should redirect to a path after login, if provided', function() {

    });

    it('should redirect them if they are already logged in', function() {

    });

    it('should authenticate them if login succeeds', function() {

    });

    it('should not authenticate them if login fails', function() {

    });
});
