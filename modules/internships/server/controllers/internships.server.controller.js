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

exports.list = function (req, res) {
  Internship.find({}).exec(function (err, internships) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internships);
  });
};

exports.read = function (req, res) {
  // convert mongoose document to JSON
  var internship = req.internship ? req.internship.toJSON() : {};
  res.json(internship);
};

exports.create = function (req, res) {
  var internship = new Internship(req.body); // req.body permet de TOUT lui mettre, on mettra des infos en plus plus loin si besoin.
  // internship.createdon = new Date();  // par exemple (non utilisé, a supprimer)

  internship.save(function (err) {  // pas besoin de mettre function (err, internship) pas besoin de lui passer qqchose pour le save.
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship); // on renvoie l'instance du modèle et non pas le modèle en lui même (evidemment, comme avece dkp)
  });
};

exports.internshipByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Internship is invalid'
    });
  }

  Internship.findById(id).exec(function (err, internship) {
    if (err) {
      return next(err);
    }

    if (!internship) {
      return res.status(404).send({
        message: 'No Internship with that identifier has been found.'
      });
    }

    req.internship = internship;
    next();
  });
};
