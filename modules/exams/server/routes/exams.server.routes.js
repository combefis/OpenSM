'use strict';

/**
 * Module dependencies
 */
var examsPolicy = require('../policies/exams.server.policy'),
  exams = require('../controllers/exams.server.controller'),
  multiparty = require('connect-multiparty');

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
  app.route('/api/exams/:examId/copy/:i').all(examsPolicy.isAllowed)
    .delete(exams.deleteCopy);
  app.route('/api/exams/:examId/copy/:i/download').all(examsPolicy.isAllowed)
    .get(exams.downloadCopy);
  app.route('/api/exams/:examId/copy/:i/upload').all(examsPolicy.isAllowed).all(multiparty())
    .post(exams.uploadCopy);

  // Finish by binding the exam middleware
  app.param('examId', exams.examByID);
};
