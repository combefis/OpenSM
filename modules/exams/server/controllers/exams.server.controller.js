'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs-extra'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  Exam = mongoose.model('Exam'),
  ExamSession = mongoose.model('ExamSession'),
  User = mongoose.model('User'),
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
 * Validate an exam
 */
exports.validate = function (req, res) {
  var exam = req.exam;

  exam.ready = true;
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
 * Add a student to an exam
 */
exports.addStudent = function (req, res) {
  var exam = req.exam;

  // Find the student to add
  User.findOne({ 'username': req.body.studentUsername }, 'username displayName').exec(function (err, student) {
    if (err || !student) {
      return res.status(404).send({
        message: 'No student with that username has been found.'
      });
    }

    // Add the student to the exam and save it
    exam.registrations.push(student);
    exam.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.json(exam.registrations);
    });
  });
};

/**
 * Delete a student of an exam
 */
exports.deleteStudent = function (req, res) {
  var exam = req.exam;

  // Remove the student from the exam and save it
  exam.registrations.splice(req.params.i, 1);
  exam.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(exam.registrations);
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
      res.json(exam.rooms);
    });
  });
};

/**
 * Remove a room of an exam
 */
exports.deleteRoom = function (req, res) {
  var exam = req.exam;

  // Remove the room from the exam and save it
  exam.rooms.splice(req.params.i, 1);
  exam.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(exam.rooms);
  });
};

/**
 * Add a copy to an exam
 */
exports.addCopy = function (req, res) {
  var exam = req.exam;

  // Add the copy to the exam and save it
  exam.copies.push({
    user: req.user
  });
  exam.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(exam.copies);
  });
};

/**
 * Remove a copy of an exam
 */
exports.deleteCopy = function (req, res) {
  var exam = req.exam;
  var copy = exam.copies[req.params.i];

  // Remove the copy from the exam and save it
  exam.copies.splice(req.params.i, 1);
  exam.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    // Delete the copy from the disk
    if (copy.name) {
      var file = path.dirname(require.main.filename) + '/copies/' + exam._id + '/' + copy.name;
      try {
        fs.removeSync(file);
      } catch (err) {
        console.log('Error while deleting copy file.');
      }
    }

    res.json(exam.copies);
  });
};

/**
 * Download a copy of an exam
 */
exports.downloadCopy = function (req, res) {
  var exam = req.exam;

  var file = path.dirname(require.main.filename) + '/copies/' + exam._id + '/' + exam.copies[req.params.i].name;
  fs.readFile(file, function (err, content) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.writeHead('200', { 'Content-Type': 'application/pdf' });
    res.end(content);
  });
};

/**
 * Upload a copy of an exam
 */
exports.uploadCopy = function (req, res) {
  var exam = req.exam;

  // Create exam directory if not existing yet
  var dest = path.dirname(require.main.filename) + '/copies/' + exam._id;
  fs.ensureDir(dest, function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    // Copy the uploaded file in the exam directory
    var file = req.files.file;
    dest += '/' + path.basename(file.path);
    fs.copy(file.path, dest, function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      // Delete uploaded file
      try {
        fs.removeSync(file.path);
      } catch (err) {
        console.log('Error while deleting uploaded file.');
      }

      // Update the copy of the exam and save it
      var copy = exam.copies[req.params.i];
      copy.name = path.basename(file.path);
      copy.origname = path.basename(file.originalFilename);
      copy.created = new Date();
      copy.user = req.user;

      exam.save(function (err) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
        res.json(exam.copies);
      });
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

  Exam.findById(id, 'title course examsession date duration registrations copies rooms ready')
  .populate('course', 'code')
  .populate('examsession', 'code name')
  .populate('rooms', 'code name')
  .populate('registrations', 'displayName username')
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
