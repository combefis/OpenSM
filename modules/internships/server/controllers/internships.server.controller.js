'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Internship = mongoose.model('Internship'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of rooms
 */
exports.listAll = function (req, res) {
  Internship.find().exec(function (err, internships) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internships);
  });
};


exports.list = function (req, res) {
  Internship.find({ 'student': req.user }).exec(function (err, myInternships) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(myInternships);
  });
};
