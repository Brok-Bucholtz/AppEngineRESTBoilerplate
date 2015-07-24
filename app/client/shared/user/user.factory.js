clientApp.factory('User', ['UserResource', '$q', function apiTokenFactory(UserResource, $q) {
    var USER_OATH_KEY = 'user.oauth.json';
    var USER_DATA_KEY = 'user.data.json';
    var MILLISECONDS_ONE_SECOND = 1000;

    var oAuthIoPublicKey = 'ps9cy0ym9_l782bKFGrf_5A4I8E';
    var userFactory = {};

    OAuth.initialize(oAuthIoPublicKey);

    var getAuthToken = function() {
        var oauth = JSON.parse(window.localStorage[USER_OATH_KEY]);

        return oauth.access_token;
    };

    var getAuthentication = function(provider) {
        return $q(function(resolve, reject) {
            OAuth.popup(provider).then(function (response) {
                var oauth = response.toJson();
                oauth.time_stamp = (new Date()).getTime();
                oauth.expires_in *= MILLISECONDS_ONE_SECOND;   //Change from seconds to miliseconds

                window.localStorage[USER_OATH_KEY] = angular.toJson(oauth);
                resolve(response);
            }).fail(reject);
        });
    };

    var getProfileData = function(authResponse) {
        return $q(function(resolve, reject) {
            authResponse.me()
                .done(resolve)
                .fail(reject)
        });
    };

    var getUser = function(profileResponse) {
        return $q(function(resolve, reject) {
            UserResource.login({
                object: 'login',
                email: profileResponse.email,
                access_token: getAuthToken()
            }).$promise.then(function (data) {
                var user = new UserResource();
                user.id = data.id;
                user.email = data.email;
                window.localStorage[USER_DATA_KEY] = angular.toJson(user);
                resolve(user);
            }).catch(reject);
        });
    };

    userFactory.login = function(provider) {
        return $q(function(resolve, reject) {
            getAuthentication(provider)
                .then(getProfileData)
                .then(getUser)
                .then(resolve)
                .catch(reject);
        });
    };

    userFactory.logout = function() {
        window.localStorage.removeItem(USER_OATH_KEY);
        window.localStorage.removeItem(USER_DATA_KEY);
    };

    userFactory.isLoggedIn = function() {
        if(window.localStorage[USER_OATH_KEY] == null) {
            return false
        }
        var oauth = JSON.parse(window.localStorage[USER_OATH_KEY]);

        return Object.keys(oauth).length > 0 && (oauth.time_stamp + oauth.expires_in) > ( new Date() ).getTime();
    };

    return userFactory;
}]);
