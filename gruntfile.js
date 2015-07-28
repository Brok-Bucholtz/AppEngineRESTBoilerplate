module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-gae');
    grunt.loadNpmTasks('grunt-karma');

    var TEST_SERVER_PORT = 9999;

    grunt.initConfig({
        gae: {
            options: {
                path: './app'
            },
            run_dev_server: {
                action: 'run',
                options: {
                    async: false
                }
            },
            run_test_server: {
                action: 'run',
                options: {
                    async: true,
                    args: {
                        port: TEST_SERVER_PORT
                    }
                }
            },
            stop: {
                action: 'kill'
            }
        },
        karma: {
            unit: {
                configFile: './operations/test/client/karma-unit.conf.js',
                singleRun: true
            },
            midway: {
                configFile: './operations/test/client/karma-midway.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: './operations/test/client/karma-e2e.conf.js',
                singleRun: true
            },
        }
    });

    grunt.registerTask('dev', ['gae:run_dev_server']);
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('default', ['dev']);

};
