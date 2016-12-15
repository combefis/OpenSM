(function (app) {
  'use strict';

  app.registerModule('activities', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('activities.routes', ['ui.router', 'core.routes', 'activities.services']);
  app.registerModule('activities.admin');
  app.registerModule('activities.admin.routes', ['ui.router', 'core.admin.routes', 'activities.services']);
  app.registerModule('activities.services');
}(ApplicationConfiguration));
