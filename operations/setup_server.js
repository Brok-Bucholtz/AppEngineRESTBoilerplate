'use strict';

var ncp = require('ncp').ncp;
var submoduleDirectory = './submodules/';
var serverLibDirectory = './app/server/lib/';

console.log('Copying submodules to app..');
ncp(submoduleDirectory + 'endpoints-proto-datastore/endpoints_proto_datastore',
    serverLibDirectory + 'endpoints_proto_datastore',
    function(err) { if (err) {throw err;} });
