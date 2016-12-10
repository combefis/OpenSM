'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Activity = mongoose.model('Activity'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an activity
 */
exports.create = function (req, res) {
  var activity = new Activity(req.body);
  activity.user = req.user;
  activity.teachers = [req.user];
  activity.academicyear = 2016;

  activity.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(activity);
  });
};

/**
 * Show the current activity
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var activity = req.activity ? req.activity.toJSON() : {};
  res.json(activity);
};

/**
 * Update an exam session
 */
exports.update = function (req, res) {
  var activity = req.activity;

  activity.code = req.body.code;
  activity.name = req.body.name;
  activity.teachers = req.body.teachers;

  activity.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(activity);
  });
};

/**
 * List of activities
 */
exports.list = function (req, res) {
  Activity.find({ 'academicyear': req.session.academicyear })
  .populate('teachers', 'displayName')
  .exec(function (err, activities) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(activities);
  });
};

/**
 * Activity middleware
 */
exports.activityByCode = function (req, res, next, code) {
  Activity.findOne({ code: code }, 'code name teachers').exec(function (err, activity) {
    if (err) {
      return next(err);
    }
    if (!activity) {
      return res.status(404).send({
        message: 'No activity with that identifier has been found.'
      });
    }
    req.activity = activity;
    next();
  });
};
