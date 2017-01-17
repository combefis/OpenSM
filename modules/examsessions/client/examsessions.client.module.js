(function (app) {
  'use strict';

  app.registerModule('examsessions', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('examsessions.routes', ['ui.router', 'core.routes', 'examsessions.services']);
  app.registerModule('examsessions.manager');
  app.registerModule('examsessions.manager.routes', ['ui.router', 'core.routes', 'examsessions.services']);
  app.registerModule('examsessions.admin');
  app.registerModule('examsessions.admin.routes', ['ui.router', 'core.admin.routes', 'examsessions.services']);
  app.registerModule('examsessions.services');
}(ApplicationConfiguration));
