(function (app) {
  'use strict';

  app.registerModule('exams', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('exams.admin');
  app.registerModule('exams.admin.routes', ['ui.router', 'core.admin.routes', 'exams.services']);
  app.registerModule('exams.routes', ['ui.router', 'core.routes', 'exams.services']);
  app.registerModule('exams.services');
}(ApplicationConfiguration));
