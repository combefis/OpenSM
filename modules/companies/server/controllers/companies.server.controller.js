'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Company = mongoose.model('Company'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a company
 */
exports.create = function (req, res) {
  var company = new Company(req.body);
  company.user = req.user;
  company.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(company);
  });
};

/**
 * Show the current company
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var company = req.company ? req.company.toJSON() : {};
  res.json(company);
};

/**
 * Update a company
 */
exports.update = function (req, res) {
  var company = req.company;

  company.name = req.body.name;
  company.address = req.body.address;
  company.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(company);
  });
};

/**
 * List of companies
 */
exports.list = function (req, res) {
  Company.find('name address')
  .sort({ name: 1 })
  .exec(function (err, companies) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(companies);
  });
};

/**
 * Company middleware
 */
exports.companyById = function (req, res, next, id) {
  Company.findById(id, 'name address')
  .exec(function (err, company) {
    if (err) {
      return next(err);
    }
    if (!company) {
      return res.status(404).send({
        message: 'No company with that id has been found.'
      });
    }
    req.company = company;
    next();
  });
};
