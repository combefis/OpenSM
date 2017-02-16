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
  console.log('in list function');
  var query = {};

  if (req.user.roles.includes('student')) {
    query = { 'student': req.user._id };
  }

  Internship.find(query).exec(function (err, internships) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internships);
  });
};

exports.read = function (req, res) {
  console.log('in read function');
  var internship = req.internship ? req.internship.toJSON() : {};
  res.json(internship);
};

exports.create = function (req, res) {
  console.log('in create function');
  var internship = new Internship(req.body); // req.body permet de TOUT lui mettre, on mettra des infos en plus plus loin si besoin.
  console.log(internship);  // par exemple (non utilisé, a supprimer)
  if (req.user.roles.includes('student')) {
    internship.student = req.user._id;
  }
  internship.save(function (err) {  // pas besoin de mettre function (err, internship) pas besoin de lui passer qqchose pour le save.
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship); // on renvoie l'instance du modèle et non pas le modèle en lui même (evidemment, comme avece dkp)
  });
};

exports.remove = function (req, res) {
  var internship = req.internship;

  internship.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(internship);
  });
};


exports.update = function (req, res) {

  console.log('in update function');

  var internship = req.internship;

  internship.student = req.body.student;
  internship.master = req.body.master;
  internship.supervisor = req.body.supervisor;
  internship.validator = req.body.validator;

  internship.proposition.theme = req.body.proposition.theme;
  internship.proposition.domain = req.body.proposition.domain;
  internship.proposition.location = req.body.proposition.location;
  internship.proposition.description = req.body.proposition.description;
  internship.proposition.approval.consultedTeacher = req.body.proposition.approval.consultedTeacher;
  internship.proposition.consultedTeacherApproval = req.body.proposition.approval.consultedTeacherApproval;
  internship.proposition.unitChiefApproval = req.body.proposition.unitChiefApproval;
  internship.proposition.masterApproval = req.body.proposition.masterApproval;
  internship.proposition.validatorApproval = req.body.proposition.validatorApproval;
  internship.proposition.supervisorApproval = req.body.proposition.supervisorApproval;

  internship.enterprise.name = req.body.enterprise.name;
  internship.enterprise.domain = req.body.enterprise.domain;
  internship.enterprise.fax = req.body.enterprise.fax;
  internship.enterprise.mail = req.body.enterprise.mail;

  internship.enterprise.address.street = req.body.enterprise.address.street;
  internship.enterprise.address.number = req.body.enterprise.address.number;
  internship.enterprise.address.postalCode = req.body.enterprise.address.postalCode;
  internship.enterprise.address.city = req.body.enterprise.address.city;
  internship.enterprise.address.country = req.body.enterprise.address.country;
  internship.enterprise.phoneNumber = req.body.enterprise.phoneNumber;

  internship.enterprise.representative.name = req.body.enterprise.representative.name;
  internship.enterprise.representative.position = req.body.enterprise.representative.position;

  internship.convention.validation = req.body.convention.validation;

  internship.activitiesNote.generalObjectives = req.body.activitiesNote.generalObjectives;
  internship.activitiesNoteapproval = req.body.activitiesNoteapproval;
/*
  internship.firstVisit.date = req.body.firstVisit.date;
  internship.firstVisit.location = req.body.firstVisit.location;
  internship.firstVisit.masterNotes = req.body.firstVisit.masterNotes;

  internship.intermediateEvaluation.location = req.body.intermediateEvaluation.location;
  internship.intermediateEvaluation.supervisorNotes = req.body.intermediateEvaluation.supervisorNotes;
  internship.intermediateEvaluation.date = req.body.intermediateEvaluation.date;
*/
  internship.oralPresentation.date = req.body.oralPresentation.date;
  internship.oralPresentation.location = req.body.oralPresentation.location;

  internship.certificate.handedIn = req.body.certificate.handedIn;

  internship.deadlines.startInternship = req.body.deadlines.startInternship;
  internship.deadlines.endInternship = req.body.deadlines.endInternship;
  internship.deadlines.writtenReport = req.body.deadlines.writtenReport;
  internship.deadlines.certificate = req.body.deadlines.certificate;

  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.internshipByID = function (req, res, next, id) {
  console.log('in internshipByID server function');
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
    // console.log(internship);
    next();
  });
};

exports.updateEnterprise = function (req, res) {

  console.log('in updateEnterprise function');

  var internship = req.internship;

  internship.enterprise.name = req.body.enterprise.name;
  internship.enterprise.domain = req.body.enterprise.domain;
  internship.enterprise.fax = req.body.enterprise.fax;
  internship.enterprise.mail = req.body.enterprise.mail;

  internship.enterprise.address.street = req.body.enterprise.address.street;
  internship.enterprise.address.number = req.body.enterprise.address.number;
  internship.enterprise.address.postalCode = req.body.enterprise.address.postalCode;
  internship.enterprise.address.city = req.body.enterprise.address.city;
  internship.enterprise.address.country = req.body.enterprise.address.country;
  internship.enterprise.phoneNumber = req.body.enterprise.phoneNumber;

  internship.enterprise.representative.name = req.body.enterprise.representative.name;
  internship.enterprise.representative.position = req.body.enterprise.representative.position;

  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.updateProposition = function (req, res) {

  console.log('in updateProposition function');

  var internship = req.internship;

  internship.master = req.body.master;
  internship.supervisor = req.body.supervisor;

  internship.proposition.theme = req.body.proposition.theme;
  internship.proposition.domain = req.body.proposition.domain;
  internship.proposition.location = req.body.proposition.location;
  internship.proposition.description = req.body.proposition.description;
  internship.proposition.approval.consultedTeacher = req.body.proposition.approval.consultedTeacher;

  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.updateJournal = function (req, res) {

  console.log('in updateJournal function');

  var internship = req.internship;
  internship.journal.entries.push({
    date: req.body.date,
    note: req.body.note
  });
  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.updateFirstVisit = function (req, res) {

  console.log('in updateFirstVisit function');

  var internship = req.internship;

  internship.firstVisit.date = req.body.firstVisit.date;
  internship.firstVisit.location = req.body.firstVisit.location;

  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.updateActivitiesNote = function (req, res) {

  console.log('in updateActivitiesNote function');

  var internship = req.internship;
  console.log(req.body.activitiesNote.generalObjectives);

  internship.activitiesNote.generalObjectives= req.body.activitiesNote.generalObjectives;

  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};