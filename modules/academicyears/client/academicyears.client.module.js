(function (app) {
  'use strict';

  app.registerModule('academicyears', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('academicyears.admin');
  app.registerModule('academicyears.admin.routes', ['ui.router', 'core.admin.routes', 'academicyears.services']);
  app.registerModule('academicyears.services');
}(ApplicationConfiguration));
