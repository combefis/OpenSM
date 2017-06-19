(function (app) {
  'use strict';

  app.registerModule('core');
  app.registerModule('core.routes', ['ui.router']);
  app.registerModule('core.admin', ['core']);
  app.registerModule('core.admin.routes', ['ui.router']);
  app.registerModule('core.student', ['core']);
  app.registerModule('core.student.routes', ['ui.router']);
  app.registerModule('core.master', ['core']);
  app.registerModule('core.master.routes', ['ui.router']);
  app.registerModule('core.manager.internships', ['core']);
  app.registerModule('core.manager.internships.routes', ['ui.router']);
  app.registerModule('core.teacher', ['core']);
  app.registerModule('core.teacher.routes', ['ui.router']);
  app.registerModule('core.coordinator', ['core']);
  app.registerModule('core.coordinator.routes', ['ui.router']);
  app.registerModule('core.validator', ['core']);
  app.registerModule('core.validator.routes', ['ui.router']);
}(ApplicationConfiguration));
