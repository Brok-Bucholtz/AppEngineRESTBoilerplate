'use strict';

module.exports = function() {
  return {
    basePath: '../../../',
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
    browsers: ['PhantomJS'],
    // ToDo: browsers: ['Chrome','Firefox', 'Internet Explorer', 'Safari'],

    files: [
      'app/client/assets/js/vendor_concat.js',
      'app/client/**/*.resource.js',
      'app/client/**/*.service.js',
      'app/client/**/*.controller.js',
      'app/client/**/*.component.js',
      'app/client/client.app.js',
      'app/client/**/*.spec.js'
    ]
  };
};
