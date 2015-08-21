var Hapi = require('hapi');
var Request = require('request');
var io = require('socket.io');
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
}], function(error) {
  if (error) {
    throw error;
  }
});

server.app.websockets = [];


server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
});

var socket = io(server.listener);

socket.on('connection', function (socket) {
  server.app.websockets.push(socket);

  console.log('socket connected');
});

server.start(function (error) {
  if (error) {
    throw error;
  }

  setInterval(function () {

    console.log(server.app.websockets.length);

    if (server.app.websockets.length > 0) {
      Request({
        method: 'GET',
        uri: 'https://api.particle.io/v1/devices/2e0017001347343339383037/cloudVar?access_token=a50934c108cee7a5ee0b6787c0cf5461bceb6a16'
      }, function (error, response, body) {
          console.log(error, body);

          server.app.websockets.forEach(function (socket) {
            socket.emit('message', body);
          });
        });
    }
  }, 5000);

  console.log('server listening');

});
