'use strict';

/**
 * Module dependencies
 */
var examsessionsPolicy = require('../policies/examsessions.server.policy'),
  examsessions = require('../controllers/examsessions.server.controller');

module.exports = function (app) {
  // Exam sessions collection routes
  app.route('/api/examsessions').all(examsessionsPolicy.isAllowed)
    .get(examsessions.list)
    .post(examsessions.create);

  // Single exam session routes
  app.route('/api/examsessions/:examsessionId').all(examsessionsPolicy.isAllowed)
    .get(examsessions.read)
    .put(examsessions.update)
    .delete(examsessions.delete);

  // Finish by binding the exam session middleware
  app.param('examsessionId', examsessions.examsessionByID);
};
