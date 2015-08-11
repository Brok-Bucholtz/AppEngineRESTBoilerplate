'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-gae');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  var metaData = {
    testServer: {
      port: 9999
    },
    operations: {
      location: './operations/'
    },
    client: {
      location: './app/client/',
      srcFiles: [
        './app/client/**/*.resource.js',
        './app/client/**/*.service.js',
        './app/client/**/*.controller.js',
        './app/client/**/*.component.js',
        './app/client/client.app.js'
      ],
      libFiles: [
        './app/client/assets/js/oauth-js/0.4.0/oauth.min.js',
        './app/client/assets/js/other/angular.min.js',
        './app/client/assets/js/other/angular-resource.min.js',
        './app/client/assets/js/other/angular-ui-router.min.js',
        './app/client/assets/js/other/angular-mocks.js'
      ]
    },
  };

  grunt.initConfig({
    gae: {
      options: {
        path: './app'
      },
      runDevServer: {
        action: 'run',
        options: {
          async: false
        }
      },
      runTestServer: {
        action: 'run',
        options: {
          async: true,
          args: {
            port: metaData.testServer.port
          }
        }
      },
      stop: {
        action: 'kill'
      }
    },
    karma: {
      unit: {
        configFile: metaData.operations.location +
          'test/client/karma-unit.conf.js',
        singleRun: true
      },
      midway: {
        configFile: metaData.operations.location +
          'test/client/karma-midway.conf.js',
        singleRun: true
      },
      e2e: {
        configFile: metaData.operations.location +
          'test/client/karma-e2e.conf.js',
        singleRun: true
      }
    },
    jasmine: {
      coverage: {
        src: metaData.client.srcFiles,
        options: {
          vendor: metaData.client.libFiles,
          specs: [metaData.client.location + '**/*.spec.js'],
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'docs/coverage/coverage.json',
            report: 'docs/coverage'
          }
        }
      }
    }
  });

  grunt.registerTask('dev', ['gae:runDevServer']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('coverage', ['jasmine:coverage']);
  grunt.registerTask('default', ['dev']);
};
