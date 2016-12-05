'use strict';

/**
 * Module dependencies
 */
var examsPolicy = require('../policies/exams.server.policy'),
  exams = require('../controllers/exams.server.controller');

module.exports = function (app) {
  // Exams collection routes
  app.route('/api/exams').all(examsPolicy.isAllowed)
    .get(exams.list)
    .post(exams.create);

  // Single exam routes
  app.route('/api/exams/:examId').all(examsPolicy.isAllowed)
    .get(exams.read)
    .put(exams.update)
    .delete(exams.delete);

  // Exam update routes
  app.route('/api/exams/:examId/room').all(examsPolicy.isAllowed)
    .post(exams.addRoom);
  app.route('/api/exams/:examId/copy').all(examsPolicy.isAllowed)
    .post(exams.addCopy);

  // Finish by binding the exam middleware
  app.param('examId', exams.examByID);
};
