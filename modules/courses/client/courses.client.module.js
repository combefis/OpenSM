(function (app) {
  'use strict';

  app.registerModule('courses', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('courses.admin');
  app.registerModule('courses.admin.routes', ['ui.router', 'core.admin.routes', 'courses.services']);
  app.registerModule('courses.routes', ['ui.router', 'core.routes', 'courses.services']);
  app.registerModule('courses.services');
}(ApplicationConfiguration));
