'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  ExamSession = mongoose.model('ExamSession'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an exam session
 */
exports.create = function (req, res) {
  var examsession = new ExamSession(req.body);
  examsession.user = req.user;
  examsession.academicyear = 2016;

  // Check data
  var errorMsg = '';
  if (moment(examsession.start).isSameOrBefore(moment.now())) {
    errorMsg = 'Start date must be in the future.';
  } else if (moment(examsession.end).isBefore(moment(examsession.start))) {
    errorMsg = 'End date must be after start date.';
  }

  if (errorMsg !== '') {
    return res.status(400).send({
      message: errorMsg
    });
  }

  // Save the exam session
  examsession.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(examsession);
  });
};

/**
 * Show the current exam session
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var examsession = req.examsession ? req.examsession.toJSON() : {};
  res.json(examsession);
};

/**
 * List of exam sessions
 */
exports.list = function (req, res) {
  ExamSession.find({ 'academicyear': req.session.academicyear }).exec(function (err, examsessions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(examsessions);
  });
};

/**
 * Exam session middleware
 */
exports.examsessionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Exam session is invalid'
    });
  }

  ExamSession.findById(id).exec(function (err, examsession) {
    if (err) {
      return next(err);
    }
    if (!examsession) {
      return res.status(404).send({
        message: 'No exam session with that identifier has been found.'
      });
    }
    req.examsession = examsession;
    next();
  });
};
