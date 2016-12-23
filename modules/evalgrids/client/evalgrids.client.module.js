(function (app) {
  'use strict';

  app.registerModule('evalgrids.admin');
  app.registerModule('evalgrids.admin.routes', ['ui.router', 'core.admin.routes', 'evalgrids.services']);
  app.registerModule('evalgrids.services');
}(ApplicationConfiguration));
