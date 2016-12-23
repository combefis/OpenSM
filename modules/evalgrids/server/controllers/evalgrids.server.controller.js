'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  EvaluationGrid = mongoose.model('EvaluationGrid'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of rooms
 */

exports.list = function (req, res) {
  EvaluationGrid.find({}).exec(function (err, evaluationGrids) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(evaluationGrids);
  });
};

exports.read = function (req, res) {
  // var internship = req.internship ? req.internship.toJSON() : {};
  var evaluationGrid = req.evaluationGrid;
  res.json(evaluationGrid);

};

exports.gridByCode = function (req, res, next, code) {
  EvaluationGrid.find({ 'code': code }).exec(function (err, evaluationGrid) {
    if (err) {
      return next(err);
    }

    if (!evaluationGrid) {
      return res.status(404).send({
        message: 'No Internship with that identifier has been found.'
      });
    }

    req.evaluationGrid = evaluationGrid;
    next();
  });
};
