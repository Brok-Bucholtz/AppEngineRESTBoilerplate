'use strict';

describe('login controller', function() {
  beforeEach(module('login.controllers'));

  var $scope = null;
  var $state = null;
  var loginCtrl = null;
  var mockUserServ = null;
  var testUser = {};

  beforeEach(inject(function($controller, $rootScope, $q) {
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

  it('should redirect to / after login by default', function() {
    expect(true).toBeFalsy();//ToDO: Implement
  });

  it('should redirect to a path after login, if provided', function() {
    expect(true).toBeFalsy();//ToDO: Implement
  });

  it('should redirect them if they are already logged in', function() {
    expect(true).toBeFalsy();//ToDO: Implement
  });

  it('should authenticate them if login succeeds', function() {
    expect(true).toBeFalsy();//ToDO: Implement
  });

  it('should not authenticate them if login fails', function() {
    expect(true).toBeFalsy();//ToDO: Implement
  });
});
