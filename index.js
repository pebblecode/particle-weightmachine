var Hapi = require('hapi');
var Request = require('request');
var Path = require('path');

var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({ port: 9000 });

server.register([{
  register: require('inert')
}, {
  register: require('./plugins/particle-weightmachine-static')
}, {
  register: require('./plugins/particle-weightmachine-socketmanager')
}, {
  register: require('./plugins/particle-weightmachine-polling')
}], function(error) {
  if (error) {
    throw error;
  }
});

server.start(function (error) {
  if (error) {
    throw error;
  }
  console.log('server listening');
});
