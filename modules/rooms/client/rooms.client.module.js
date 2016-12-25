(function (app) {
  'use strict';

  app.registerModule('rooms', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('rooms.admin');
  app.registerModule('rooms.admin.routes', ['ui.router', 'core.admin.routes', 'rooms.services']);
  app.registerModule('rooms.services');
}(ApplicationConfiguration));
