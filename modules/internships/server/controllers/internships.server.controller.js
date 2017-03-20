'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Internship = mongoose.model('Internship'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.list = function (req, res) {
  console.log('in list function');
  var query = {};
  var populateQuery = {};

  if (req.user.roles.includes('student')) {
    query = { 'student': req.user._id };
    populateQuery = [{ path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }, { path: 'student', select: 'firstname lastname username' }];
  }

  if (req.user.roles.includes('master')) {
    if (req.query.studentId) {
      query = { 'student': req.query.studentId, 'master': req.user._id };
      populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor', select: 'username' }, { path: 'master', select: 'username' }];
    } else {
      console.log("coucou la frite");
      query = { 'master': req.user._id };
      populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }];
    }
  }

  if (req.user.roles.includes('manager.internships')) {
    query = {};
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }];
  }

  if (req.user.roles.includes('teacher')) {
    query = { $or: [{ 'supervisor.supervisor': req.user._id }, { 'supervisor.proposedSupervisor': req.user._id }, { 'consultedTeacher': req.user._id }] };
    populateQuery = [{ path: 'supervisor.supervisor', select: 'username' }, { path: 'supervisor.proposedSupervisor', select: 'username' }, { path: 'consultedTeacher', select: 'username' }, { path: 'student', select: 'username firstname lastname' }];
  }

  if (req.user.roles.includes('coordinator')) {
    query = {};
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }];
  }

  Internship.find(query).populate(populateQuery).exec(function (err, internships) {
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
  var populateQuery = {};

  if (req.user.roles.includes('student')) {
    populateQuery = [{ path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }, { path: 'consultedTeacher', select: 'username' }];
  }

  if (req.user.roles.includes('master')) {
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor', select: 'username' }, { path: 'master', select: 'username' }];
  }

  if (req.user.roles.includes('manager.internships')) {
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.proposedSupervisor', select: 'username' }, { path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }];
  }

  if (req.user.roles.includes('coordinator')) {
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.proposedSupervisor', select: 'username' }, { path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }];
  }

  if (req.user.roles.includes('teacher')) {
    populateQuery = [{ path: 'supervisor.supervisor', select: 'username' }, { path: 'supervisor.proposedSupervisor', select: 'username' }, { path: 'consultedTeacher', select: 'username' }, { path: 'student', select: 'username firstname lastname' }];
  }

  Internship.findById(req.internship._id).populate(populateQuery).exec(function (err, internship) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });

};

exports.create = function (req, res) {
  console.log('in create function');
  var internship = new Internship(req.body); // req.body permet de TOUT lui mettre, on mettra des infos en plus plus loin si besoin.

  internship.generalStatus = stateMachine(req, internship);
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

  // internship = req.body??

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

  internship.oralPresentation.date = req.body.oralPresentation.date;
  internship.oralPresentation.location = req.body.oralPresentation.location;

  internship.certificate.handedIn = req.body.certificate.handedIn;

  internship.deadlines.startInternship = req.body.deadlines.startInternship;
  internship.deadlines.endInternship = req.body.deadlines.endInternship;
  internship.deadlines.writtenReport = req.body.deadlines.writtenReport;
  internship.deadlines.certificate = req.body.deadlines.certificate;

  internship.generalStatus = stateMachine(req, internship);
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

  internship.generalStatus = stateMachine(req, internship);
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

  if (req.user.roles.includes('master')) {
    internship.proposition.approval.masterComment = req.body.proposition.approval.masterComment;
    internship.proposition.approval.masterApproval = req.body.proposition.approval.masterApproval;
  }

  if (req.user.roles.includes('coordinator')) {
    internship.proposition.approval.coordinatorComment = req.body.proposition.approval.coordinatorComment;
    internship.proposition.approval.coordinatorApproval = req.body.proposition.approval.coordinatorApproval;
  }

  if (req.user.roles.includes('teacher')) {
    internship.proposition.approval.consultedTeacherComment = req.body.proposition.approval.consultedTeacherComment;
    internship.proposition.approval.consultedTeacherApproval = req.body.proposition.approval.consultedTeacherApproval;
  }

  if ((req.user.roles.includes('student')) || req.user.roles.includes('admin')) {
    internship.master = req.body.master;
    internship.supervisor = req.body.supervisor;
    internship.consultedTeacher = req.body.consultedTeacher;

    internship.proposition.theme = req.body.proposition.theme;
    internship.proposition.domain = req.body.proposition.domain;
    internship.proposition.location = req.body.proposition.location;
    internship.proposition.description = req.body.proposition.description;

    internship.proposition.approval = {};
    internship.proposition.approval.masterComment = '';
    internship.proposition.approval.masterApproval = 'pending';
    internship.proposition.approval.coordinatorComment = '';
    internship.proposition.approval.coordinatorApproval = 'pending';
    internship.proposition.approval.consultedTeacherComment = '';
    internship.proposition.approval.consultedTeacherApproval = 'pending';
  }

  if ((internship.proposition.approval.coordinatorApproval === true) && (internship.proposition.approval.consultedTeacherApproval === true) && (req.body.proposition.approval.masterApproval === true)) {
    internship.proposition.approval.approved = true;
  }

  internship.generalStatus = stateMachine(req, internship);
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

  internship.generalStatus = stateMachine(req, internship);
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
  internship.generalStatus = stateMachine(req, internship);
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

  if (req.user.roles.includes('master')) {
    internship.activitiesNote.approval = req.body.activitiesNote.approval;
    internship.activitiesNote.masterComment = req.body.activitiesNote.masterComment;
  } else {
    internship.activitiesNote.generalObjectives = req.body.activitiesNote.generalObjectives;
  }

  internship.generalStatus = stateMachine(req, res);
  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.updateOralPresentation = function (req, res) {

  console.log('in updateOralPresentation function');

  var internship = req.internship;
  console.log(req.body.oralPresentation);
  internship.oralPresentation = req.body.oralPresentation;

  internship.generalStatus = stateMachine(req, internship);
  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.updateSupervisor = function (req, res) {

  console.log('in updateSupervisor function');
  var internship = req.internship;
  console.log(req.body);

  if (req.user.roles.includes('student')) {
    internship.supervisor.proposedSupervisor = req.body.supervisor.proposedSupervisor;
    internship.supervisor.propositionResponse = "pending";
    internship.supervisor.status = 'waiting for supervisor approval';
  }

  if (req.user.roles.includes('teacher')) {

    if (req.body.supervisor.propositionResponse === "accepted") {
      internship.supervisor.status = 'waiting coordinator approval';
      console.log("accepted");
    } else if (req.body.supervisor.propositionResponse === "refused") {
      console.log(req.body);
      // !!!!!!! error!!!!! vm.internship.supervisor.propositionResponseComment

      internship.supervisor.propositionResponseComment = req.body.supervisor.propositionResponseComment;
      internship.supervisor.status = 'refused, waiting coordinator approval';
      console.log("refused");
    }
    internship.supervisor.propositionResponse = req.body.supervisor.propositionResponse;
  }

  if (req.user.roles.includes('manager.internships')) {
    console.log('i am a manager');
  }

  internship.generalStatus = stateMachine(req, internship);
  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

function stateMachine(req, internship) {

// ! verifier qu'on envoie bien (req, internship)  en appelant la fonciotn

  var status = internship.generalStatus;

  switch (internship.generalStatus) {
    case 'Enterprise Encoding':
      if (req.body.enterprise) {
        status = 'Proposition Encoding';
      }
      break;

    case 'Proposition Encoding':
      if (req.body.proposition) {
        status = 'Proposition Validation';
      }
      break;

    case 'Proposition Validation':
      if (req.body.proposition.approval.consultedTeacherApproval && req.body.proposition.approval.masterApproval && req.body.proposition.approval.coordinatorApproval) {
        status = 'Supervisor Attribution';
      }
      break;

    case 'Supervisor Attribution':
      break;

    default: status = 'Enterprise Encoding';
  }
  return (status);

}
