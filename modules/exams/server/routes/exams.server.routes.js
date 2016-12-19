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
  app.route('/api/exams/:examId/validate').all(examsPolicy.isAllowed)
    .post(exams.validate);
  app.route('/api/exams/:examId/assignseats').all(examsPolicy.isAllowed)
    .post(exams.assignSeats);

  // Exam students routes
  app.route('/api/exams/:examId/student').all(examsPolicy.isAllowed)
    .post(exams.addStudent);
  app.route('/api/exams/:examId/student/:i').all(examsPolicy.isAllowed)
    .delete(exams.deleteStudent);

  // Exam rooms routes
  app.route('/api/exams/:examId/room').all(examsPolicy.isAllowed)
    .post(exams.addRoom);
  app.route('/api/exams/:examId/room/:i').all(examsPolicy.isAllowed)
    .delete(exams.deleteRoom);
  app.route('/api/exams/:examId/room/:i/configure').all(examsPolicy.isAllowed)
    .post(exams.configureRoom);

  // Exam copies routes
  app.route('/api/exams/:examId/copy').all(examsPolicy.isAllowed)
    .post(exams.addCopy);
  app.route('/api/exams/:examId/copy/:i').all(examsPolicy.isAllowed)
    .delete(exams.deleteCopy);
  app.route('/api/exams/:examId/copy/:i/download').all(examsPolicy.isAllowed)
    .get(exams.downloadCopy);
  app.route('/api/exams/:examId/copy/:i/upload').all(examsPolicy.isAllowed).all(multiparty())
    .post(exams.uploadCopy);
  app.route('/api/exams/:examId/copy/:i/validate').all(examsPolicy.isAllowed)
    .post(exams.validateCopy);
  app.route('/api/exams/:examId/copies/validate').all(examsPolicy.isAllowed)
    .post(exams.validateCopies);
  app.route('/api/exams/:examId/copies/generate').all(examsPolicy.isAllowed)
    .post(exams.generateCopies);

  // Finish by binding the exam middleware
  app.param('examId', exams.examByID);
};
