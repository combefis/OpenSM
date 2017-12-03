'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  ExamSession = mongoose.model('ExamSession'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/*
 * Check whether an exam session is valid
 */
function checkData (examsession) {
  if (moment(examsession.start).isSameOrBefore(moment.now())) {
    return 'Start date must be in the future.';
  }
  if (moment(examsession.end).isBefore(moment(examsession.start))) {
    return 'End date must be after start date.';
  }
  return '';
}

/**
 * Create an exam session
 */
exports.create = function (req, res) {
  var examsession = new ExamSession(req.body);
  examsession.user = req.user;
  examsession.academicyear = req.session.academicyear;

  // Check data
  var errorMsg = checkData(examsession);
  if (errorMsg !== '') {
    return res.status(422).send({
      message: errorMsg
    });
  }

  // Save the exam session
  examsession.save(function (err) {
    if (err) {
      return res.status(422).send({
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
 * Update an exam session
 */
exports.update = function (req, res) {
  var examsession = req.examsession;

  examsession.code = req.body.code;
  examsession.name = req.body.name;
  examsession.description = req.body.description;
  examsession.start = req.body.start;
  examsession.end = req.body.end;

  // Check data
  var errorMsg = checkData(examsession);
  if (errorMsg !== '') {
    return res.status(422).send({
      message: errorMsg
    });
  }

  examsession.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(examsession);
  });
};

/*
 * Delete an exam session
 */
exports.delete = function (req, res) {
  var examsession = req.examsession;

  // Check if can be deleted
  if (examsession.exams.length) {
    return res.status(422).send({
      message: 'Cannot delete an exam session with exams'
    });
  }

  examsession.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(examsession);
  });
};

/**
 * List of exam sessions
 */
exports.list = function (req, res) {
  ExamSession.find({ 'academicyear': req.session.academicyear }, 'code name start end')
  .sort({ start: 1 })
  .exec(function (err, examsessions) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(examsessions);
  });
};

/**
 * Exam session middleware
 */
exports.examsessionByCode = function (req, res, next, code) {
  var examFields = 'title date course';
  if (req.user.roles.includes('printer') || req.user.roles.includes('manager.exams')) {
    examFields += ' validation';
  }

  ExamSession.findOne({ 'code': code, academicyear: req.session.academicyear }, 'code name description start end exams')
  .populate('exams', examFields)
  .exec(function (err, examsession) {
    if (err) {
      return next(err);
    }
    if (!examsession) {
      return res.status(404).send({
        message: 'No exam session with that identifier has been found.'
      });
    }

    ExamSession.populate(examsession, { path: 'exams.course', select: 'code name team', model: 'Course' }, function (err, examsession) {
      if (err || !examsession) {
        return res.status(422).send({
          message: 'Error while retrieving information about the exam session.'
        });
      }

      ExamSession.populate(examsession, { path: 'exams.course.team', select: 'username', model: 'User' }, function (err, examsession) {
        if (err || !examsession) {
          return res.status(422).send({
            message: 'Error while retrieving information about the exam session.'
          });
        }

        req.examsession = examsession;
        next();
      });
    });
  });
};
