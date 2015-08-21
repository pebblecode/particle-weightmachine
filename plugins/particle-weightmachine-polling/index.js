'use strict';

var Request = require('request');

var registerPlugin = function (server, options, next) {

  server.method({
    name: 'getWeightData',
    method: function () {
      if (server.app.websockets && server.app.websockets.length > 0) {
        Request({
          method: 'GET',
          uri: 'https://api.particle.io/v1/devices/2e0017001347343339383037/cloudVar?access_token=a50934c108cee7a5ee0b6787c0cf5461bceb6a16',
          json: true
        }, function (error, response, body) {
          server.app.websockets.forEach(function (socket) {
            socket.emit('message', body);
          });
        });
      }
    }
  });

  setInterval(server.methods.getWeightData, 100);

  return next();
};

registerPlugin.attributes = {
  name: 'particle-weightmachine-polling',
  version: '1.0.0',
  dependencies: []
};

module.exports = registerPlugin;
