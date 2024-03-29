'use strict';

var registerPlugin = function (server, options, next) {

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

  return next();
};

registerPlugin.attributes = {
  name: 'particle-weightmachine-static',
  version: '1.0.0',
  dependencies: []
};

module.exports = registerPlugin;
