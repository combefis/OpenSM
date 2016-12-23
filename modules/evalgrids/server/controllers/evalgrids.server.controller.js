'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  EvalGrid = mongoose.model('EvalGrid'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/*
 * Show the current evalgrid
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var evalgrid = req.evalgrid ? req.evalgrid.toJSON() : {};

  res.json(evalgrid);
};

/**
 * List of evalgrids
 */
exports.list = function (req, res) {
  EvalGrid.find({}, 'code name author')
  .sort({ code: 1 })
  .exec(function (err, evalgrids) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(evalgrids);
  });
};

/**
 * Evalgrid middleware
 */
exports.evalgridByCode = function (req, res, next, code) {
  EvalGrid.findOne({ code: code }, 'code name criteria')
  .exec(function (err, evalgrid) {
    if (err) {
      return next(err);
    }
    if (!evalgrid) {
      return res.status(404).send({
        message: 'No evaluation grid with that code has been found.'
      });
    }

    req.evalgrid = evalgrid;
    next();
  });
};
