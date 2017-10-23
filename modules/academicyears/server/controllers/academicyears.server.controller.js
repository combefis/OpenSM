'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  AcademicYear = mongoose.model('AcademicYear'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/*
 * Check whether an academic year is valid
 */
function checkData (academicyear) {
  if (moment(academicyear.start).isSameOrBefore(moment.now())) {
    return 'Start date must be in the future.';
  }
  if (moment(academicyear.end).isBefore(moment(academicyear.start))) {
    return 'End date must be after start date.';
  }
  return '';
}

/**
 * Create an academic year
 */
exports.create = function (req, res) {
  var academicyear = new AcademicYear(req.body);
  academicyear.user = req.user;

  // Check data
  var errorMsg = checkData(academicyear);
  if (errorMsg !== '') {
    return res.status(400).send({
      message: errorMsg
    });
  }

  // Save the academic year
  academicyear.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(academicyear);
  });
};

/**
 * Show the current academic year
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var academicyear = req.academicyear ? req.academicyear.toJSON() : {};
  res.json(academicyear);
};

/**
 * Update an academic year
 */
exports.update = function (req, res) {
  var academicyear = req.academicyear;

  academicyear.code = req.body.code;
  academicyear.start = req.body.start;
  academicyear.end = req.body.end;

  // Check data
  var errorMsg = checkData(academicyear);
  if (errorMsg !== '') {
    return res.status(400).send({
      message: errorMsg
    });
  }

  academicyear.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(academicyear);
  });
};

/*
 * Delete an academic year
 */
exports.delete = function (req, res) {
  var academicyear = req.academicyear;

  academicyear.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(academicyear);
  });
};

/**
 * List of academic years
 */
exports.list = function (req, res) {
  AcademicYear.find('code start end')
  .sort({ start: -1 })
  .exec(function (err, academicyears) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(academicyears);
  });
};

/**
 * Get the current academic year
 */
exports.current = function (req, res) {
  AcademicYear.findOne({
    $and: [
      { start: { $lte: new Date() } },
      { end: { $gte: new Date() } }
    ]
  }, 'code start end')
  .exec(function (err, academicyear) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    if (!academicyear) {
      return res.status(404).send({
        message: 'No academic year now.'
      });
    }
    res.json(academicyear);
  });
};

/**
 * Academic year middleware
 */
exports.academicyearByCode = function (req, res, next, code) {
  AcademicYear.findOne({ 'code': code }, 'code start end')
  .exec(function (err, academicyear) {
    if (err) {
      return next(err);
    }
    if (!academicyear) {
      return res.status(404).send({
        message: 'No academic year with that code has been found.'
      });
    }
    req.academicyear = academicyear;
    next();
  });
};
