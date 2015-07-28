'use strict';

var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
    var conf = sharedConfig();
    config.set(conf);
};
