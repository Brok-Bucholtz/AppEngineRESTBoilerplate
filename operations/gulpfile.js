'use strict';

var exec = require('child_process').exec;
var gulp = require('gulp');
var gutil = require('gulp-util');
var karma = require('gulp-karma');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc');
var concat = require('gulp-concat');
var bower = require('gulp-bower');
var todo = require('gulp-todo');
var angularProtractor = require('gulp-angular-protractor');
var coveralls = require('gulp-coveralls');

var through = require('through2');
var del = require('del');
var jip = require('jasmine-istanbul-phantom');

var jshintConfig = require('./jshint-conf.json');
var appPackage = require('../package.json');

var clientFiles = [
  '../app/client/**/*.resource.js',
  '../app/client/**/*.service.js',
  '../app/client/**/*.controller.js',
  '../app/client/**/*.component.js',
  '../app/client/client.app.js'];
var libFile = '../app/client/assets/js/vendor_concat.js';
var unitTestFiles = ['../app/client/**/*.spec.js'];
var e2eTestFiles = ['test/client/e2e/*.e2e.js'];
var operationFiles = ['**/*.js'];
var readMeFiles = ['../**/README.md'];
var bowerLibFiles = [
  '../tmp/bower_components/oauth-js/dist/oauth.min.js',
  '../tmp/bower_components/angular/angular.min.js',
  '../tmp/bower_components/angular-resource/angular-resource.min.js',
  '../tmp/bower_components/angular-ui-router/release/angular-ui-router.min.js',
  '../tmp/bower_components/angular-mocks/angular-mocks.js'];
var setupFiles = [
  '../docs',
  '../node_modules',
  '../tmp',
  '../app/server/lib',
  '../app/client/assets/js'];

var codeBaseJsFiles = clientFiles.concat(
    unitTestFiles,
    e2eTestFiles,
    operationFiles);

var standardExecCallBack = function(error, stdout, stderr) {
  if (error) {throw error;}
  if (stdout) {gutil.log(stdout);}
  if (stderr) {gutil.log(stderr);}
};

gulp.task('setup-client', function() {
  var libDirectory = libFile.match(/^.*[\\\/]/)[0];
  var libFilename = libFile.replace(/^.*[\\\/]/, '');
  gutil.log(libDirectory);
  gutil.log(libFilename);

  bower('../tmp/bower_components');
  gulp.src(bowerLibFiles)
    .pipe(concat(libFilename))
    .pipe(gulp.dest(libDirectory));
});
gulp.task('setup-server', function() {
  gulp.src(
    '../submodules/endpoints-proto-datastore/endpoints_proto_datastore/**')
    .pipe(gulp.dest('../app/server/lib/endpoints_proto_datastore'));
});

gulp.task('check-setup', function(callBack) {
  del(setupFiles, {force: true} , callBack);
  exec('cd .. && npm install', standardExecCallBack);
});
gulp.task('check-lint', function() {
  jshintConfig.lookup = false;

  return gulp.src(codeBaseJsFiles)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('check-style', function() {
  return gulp.src(codeBaseJsFiles)
    .pipe(jscs({
        preset: 'google',
        disallowTrailingWhitespace: 'ignoreEmptyLines'
      }));
});
gulp.task('check-unittest', function() {
  return gulp.src([libFile].concat(clientFiles, unitTestFiles))
    .pipe(karma({
      configFile: './test/client/karma-unit.conf.js',
      action: 'run'
    }));
});
gulp.task('check-e2etest', function() {
  var testServerChildProcess =
    exec(
      'dev_appserver.py ../app --port=9999',
      standardExecCallBack);

  gulp.src(e2eTestFiles)
    .pipe(angularProtractor({
      configFile: 'test/client/protractor-e2e.conf.js',
      autoStartStopServer: true
    }))
    .on('error', function(error) {
      testServerChildProcess.kill();
      throw error;
    })
    .on('end', function() {
      testServerChildProcess.kill();
      process.exit();
    });
});
gulp.task('check-unitcoverage', ['generate-unittestcoverage'], function() {
  exec(
    'node ../node_modules/istanbul/lib/cli.js ' +
      'check-coverage ../docs/coverage/coverage-final.json ' +
      '--config ./istanbul-conf.json ',
    standardExecCallBack);
});
gulp.task('check-comments', function() {
  gulp.src(codeBaseJsFiles)
      .pipe(todo({
        reporter: 'json'
      }))
      .pipe(through.obj(function(file) {
        var todosString = file.contents.toString();
        var todos = JSON.parse(todosString);
        if (Object.keys(todos).length > 0) {
          gutil.log(todosString);
          gutil.log(
            'Error: ToDos in code, please move them to the issue board');
          process.exit(1);
        }
      }));
});
gulp.task('generate-unittestcoverage', function(callBack) {
  jip({
    tmp: '../tmp/jip',
    jasmine: {
      report: '../tmp/jip'
    },
    istanbul: {
      report: '../docs/coverage',
      reporters: ['html', 'lcov', 'json']
    },
    src: clientFiles,
    lib: libFile,
    spec: unitTestFiles,
    callback: callBack
  });
});
gulp.task('generate-docs', function() {
  gulp.src(clientFiles.concat(readMeFiles))
    .pipe(jsdoc.parser({
      name: appPackage.name,
      version: appPackage.version,
      licenses: [appPackage.license]
    }))
    .pipe(jsdoc.generator('../docs/code',{
      private: true
    }));
});

gulp.task('deploy-coveralls', ['generate-unittestcoverage'], function() {
  gulp.src('../docs/coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('check-formatting', [
  'check-lint',
  'check-style']);
gulp.task('check-test', [
  'check-unittest',
  'check-e2etest',
  'check-unitcoverage']);
gulp.task('setup-app', ['setup-client', 'setup-server']);
gulp.task('check-code', [
  'check-test',
  'check-formatting',
  'check-comments']);

gulp.task('default');
