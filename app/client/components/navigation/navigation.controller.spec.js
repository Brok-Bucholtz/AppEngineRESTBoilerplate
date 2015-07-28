'use strict';

describe('navigation controller', function(){
    beforeEach(module('navigation.controllers'));

    var $scope,
        navCtrl,
        mockUserServ,
        mockState;

    beforeEach(inject(function($controller, $rootScope){
        $scope = $rootScope.$new();

        mockUserServ = jasmine.createSpyObj('UserService', ['logout']);
        mockState = jasmine.createSpyObj('$state', ['go']);

        navCtrl = $controller('NavigationCtrl', {
            $scope: $scope,
            $state: mockState,
            UserService: mockUserServ
        });
        $scope.$digest();
    }));

    it('should reload the state when logging out', function() {
        $scope.logout();

        expect(mockUserServ.logout).toHaveBeenCalled();
        expect(mockState.go).toHaveBeenCalled();
    });
});
