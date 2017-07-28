(function (app) {
  'use strict';

  app.registerModule('companies', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('companies.admin');
  app.registerModule('companies.admin.routes', ['ui.router', 'core.admin.routes', 'companies.services']);
  app.registerModule('companies.routes', ['ui.router', 'core.routes', 'companies.services']);
  app.registerModule('companies.services');
}(ApplicationConfiguration));
