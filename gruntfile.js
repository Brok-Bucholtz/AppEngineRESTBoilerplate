'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-gae');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-protractor-runner');

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
      libFiles: ['./app/client/assets/js/vendor_concat.js']
    }
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
      },
      coverageLcov: {
        src: metaData.client.srcFiles,
        options: {
          vendor: metaData.client.libFiles,
          specs: [metaData.client.location + '**/*.spec.js'],
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'docs/coverage/coverage.json',
            report: {
              type: 'lcovonly',
              options: {
                dir: 'docs/coverage'
              }
            }
          }
        }
      }
    },
    concat: {
      vendorJS: {
        src: [
          'bower_components/oauth-js/dist/oauth.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular-resource/angular-resource.min.js',
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/angular-mocks/angular-mocks.js'
        ],
        dest: 'app/client/assets/js/vendor_concat.js',
      }
    },
    protractor: {
      options: {
        configFile: metaData.operations.location +
          'test/client/protractor-e2e.conf.js'
      },
      e2e: {}
    }
  });

  grunt.registerTask('dev', ['gae:runDevServer']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('coverage', ['jasmine:coverage']);
  grunt.registerTask('coverageLcov', ['jasmine:coverageLcov']);
  grunt.registerTask('setupclient', ['concat:vendorJS']);

  grunt.registerTask('default', ['dev']);
};
