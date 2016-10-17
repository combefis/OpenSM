(function (app) {
  'use strict';

  app.registerModule('rooms', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('rooms.services');
  app.registerModule('rooms.routes', ['ui.router', 'core.routes', 'rooms.services']);
}(ApplicationConfiguration));
