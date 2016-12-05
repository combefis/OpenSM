'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  Exam = mongoose.model('Exam'),
  ExamSession = mongoose.model('ExamSession'),
  Room = mongoose.model('Room'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/*
 * Check whether an exam is valid
 */
function checkData (exam) {
  if (!moment(exam.date).isBetween(exam.examsession.start, exam.examsession.end, 'day', '[]')) {
    return 'Exam date must be between the start and end dates of the exam session.';
  }
  if (exam.duration <= 0) {
    return 'Exam duration must be positive.';
  }
  return '';
}

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

    // Check data
    exam.examsession = examsession;
    var errorMsg = checkData(exam);
    if (errorMsg !== '') {
      return res.status(400).send({
        message: errorMsg
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

/*
 * Delete an exam
 */
exports.delete = function (req, res) {
  var exam = req.exam;

  // Load the exam session
  ExamSession.findById(exam.examsession).exec(function (err, examsession) {
    if (err || !examsession) {
      return res.status(400).send({
        message: 'Impossible to find the exam session.'
      });
    }

    // Remove the exam from the exam session
    var i = examsession.exams.findIndex(function (element) {
      return element.toString() === exam._id.toString();
    });
    examsession.exams.splice(i, 1);
    examsession.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      exam.remove(function (err) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        }

        res.json(exam);
      });
    });
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
 * Add a room to an exam
 */
exports.addRoom = function (req, res) {
  var exam = req.exam;

  // Find the room to add
  Room.findOne({ 'code': req.body.roomCode }, 'code name').exec(function (err, room) {
    if (err || !room) {
      return res.status(404).send({
        message: 'No room with that code has been found.'
      });
    }

    // Add the room to the exam and save it
    exam.rooms.push(room);
    exam.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.json(exam);
    });
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

  Exam.findById(id, 'title course examsession date duration registrations copies rooms')
  .populate('course', 'code')
  .populate('examsession', 'code name')
  .populate('rooms', 'code')
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
