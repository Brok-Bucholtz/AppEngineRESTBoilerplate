'use strict';

module.exports = function() {
  return {
    basePath: '../../../',
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
    browsers: ['PhantomJS'],
    //browsers: ['Chrome','Firefox', 'Internet Explorer', 'Safari'],

    files: [
      'app/client/assets/js/oauth-js/0.4.0/oauth.min.js',
      'app/client/assets/js/other/angular.min.js',
      'app/client/assets/js/other/angular-resource.min.js',
      'app/client/assets/js/other/angular-ui-router.min.js',
      'app/client/assets/js/other/angular-mocks.js',
      'app/client/**/*.resource.js',
      'app/client/**/*.service.js',
      'app/client/**/*.controller.js',
      'app/client/**/*.component.js',
      'app/client/client.app.js',
      'app/client/**/*.spec.js'
    ]
  };
};
