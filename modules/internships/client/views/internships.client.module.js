(function (app) {
  'use strict';

  app.registerModule('internships', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('internships.services');
  app.registerModule('internships.routes', ['ui.router', 'core.routes', 'rooms.services']);
}(ApplicationConfiguration));
