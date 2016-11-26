'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  Exam = mongoose.model('Exam'),
  ExamSession = mongoose.model('ExamSession'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an exam
 */
exports.create = function (req, res) {
  var exam = new Exam(req.body);
  exam.user = req.user;
  exam.course = req.body.course[0];
  exam.examsession = req.body.examsession[0];
  exam.academicyear = 2016;

  // Load the exam session
  ExamSession.findById(exam.examsession).exec(function (err, examsession) {
    if (err || !examsession) {
      return res.status(400).send({
        message: 'Impossible to find the exam session.'
      });
    }

    // Save the exam
    exam.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      // Add the exam to the exam session
      examsession.exams.push(exam);
      examsession.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: 'Impossible to update the exam session.'
          });
        }
        res.json(exam);
      });
    });
  });
};

/**
 * Show the current exam
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var exam = req.exam ? req.exam.toJSON() : {};
  res.json(exam);
};

/**
 * Update an exam
 */
exports.update = function (req, res) {
  var exam = req.exam;

  exam.title = req.body.title;
  exam.course = req.body.course[0];
  exam.examsession = req.body.examsession[0];
  exam.date = req.body.date;
  exam.duration = req.body.duration;

  exam.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(exam);
  });
};

/**
 * List of exams
 */
exports.list = function (req, res) {
  Exam.find({ 'academicyear': req.session.academicyear }).sort({ date: 1 }).exec(function (err, exams) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(exams);
  });
};

/**
 * Exam middleware
 */
exports.examByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Exam is invalid'
    });
  }

  Exam.findById(id, 'title course examsession date duration')
  .populate('course', 'code')
  .populate('examsession', 'name')
  .exec(function (err, exam) {
    if (err) {
      return next(err);
    }
    if (!exam) {
      return res.status(404).send({
        message: 'No exam with that identifier has been found.'
      });
    }
    req.exam = exam;
    next();
  });
};
