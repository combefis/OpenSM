'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Internship = mongoose.model('Internship'),
  Deadlines = mongoose.model('Deadlines'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.list = function (req, res) {
  console.log('in list function');
  var query = {};
  var populateQuery = {};

  if (req.user.roles.includes('student')) {
    query = { 'student': req.user._id };
    populateQuery = [{ path: 'supervisor.supervisor', select: 'username lastname firstname' }, { path: 'master', select: 'username displayName' }, { path: 'student', select: 'firstname lastname username' }, { path: 'deadlines.deadlines' }];
  }

  if (req.user.roles.includes('master')) {
    if (req.query.studentId) {

      query = { 'master': req.user._id, 'student': req.query.studentId }; // 'student': req.query.studentId,
      populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'master', select: 'username' }];
    } else {
      query = { 'master': req.user._id };
      populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }];
    }
  }

  if (req.user.roles.includes('manager.internships')) {
    query = {};
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.proposedSupervisor', select: 'username displayName' }, { path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }, { path: 'consultedTeacher', select: 'username' }];
  }

  if (req.user.roles.includes('teacher')) {
    console.log('teacher');
    query = { $or: [{ 'supervisor.supervisor': req.user._id }, { 'supervisor.proposedSupervisor': req.user._id }, { 'consultedTeacher': req.user._id }] };
    populateQuery = [{ path: 'supervisor.supervisor', select: 'username displayName firstname lastname' }, { path: 'supervisor.proposedSupervisor', select: 'username' }, { path: 'consultedTeacher', select: 'username' }, { path: 'master', select: 'username displayName firstname lastname' }, { path: 'student', select: 'username firstname lastname' }];
  }

  if (req.user.roles.includes('coordinator')) {
    query = {};
    populateQuery = [{ path: 'supervisor.supervisor', select: 'username displayName firstname lastname' }, { path: 'supervisor.proposedSupervisor', select: 'username' }, { path: 'consultedTeacher', select: 'username' }, { path: 'master', select: 'username displayName firstname lastname' }, { path: 'student', select: 'username firstname lastname' }];
  }

  if (req.user.roles.includes('validator')) {
    query = {};
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.supervisor', select: 'username displayName firstname lastname' }, { path: 'master', select: 'username' }, { path: 'consultedTeacher', select: 'username displayName firstname lastname' }, { path: 'supervisor.proposedSupervisor', select: 'username displayName' }];
  }

  if (req.user.roles.includes('admin')) {
    query = {};
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.proposedSupervisor', select: 'username displayName' }, { path: 'supervisor.supervisor', select: 'username' }, { path: 'master', select: 'username' }, { path: 'consultedTeacher', select: 'username' }];
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

exports.updateDeliverables = function (req, res) {
  console.log('in updateDeliverables function');
  var internship = req.body;
  internship = stateMachine(internship);
  Internship.update({ _id: internship._id }, { $set: { 'certificate.handedIn': internship.certificate.handedIn, 'writtenReport.handedIn': internship.writtenReport.handedIn } }, function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });
  res.json(internship);
};

exports.readDeadlines = function (req, res) {
  console.log('in readDeadlines function');
  console.log(req.deadlines._id);

  Deadlines.findById(req.deadlines._id).exec(function (err, deadlines) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(deadlines);
  });

};

exports.listDeadlines = function (req, res) {
  console.log('in list Deadlines function');
  Deadlines.find({}).exec(function(err, deadlines) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(deadlines);
  });
};

exports.updateDeadlines = function (req, res) {
  console.log('in updateDeadlines function');
  var deadlines = req.deadlines;
  deadlines.coordinatorMeeting = req.body.coordinatorMeeting;
  deadlines.foreignInternshipDemand = req.body.foreignInternshipDemand;
  deadlines.convention = req.body.convention;
  deadlines.activitiesNote = req.body.activitiesNote;
  deadlines.firstVisit = req.body.firstVisit;
  deadlines.autoEvaluation = req.body.autoEvaluation;
  deadlines.oralPresentation = req.body.oralPresentation;
  deadlines.writtenReport = req.body.writtenReport;
  deadlines.completeEvaluation = req.body.completeEvaluation;

  console.log(req.body);
  deadlines.save(function (err) {  // pas besoin de mettre function (err, internship) pas besoin de lui passer qqchose pour le save.
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(deadlines); // on renvoie l'instance du modèle et non pas le modèle en lui même (evidemment, comme avece dkp)
  });
};

exports.read = function (req, res) {
  console.log('in read function');
  var populateQuery = {};

// ! ATTENTION ! si deux roles, le dernier va écraser le premier. A corriger a un moment.

  if (req.user.roles.includes('student')) {
    populateQuery = [{ path: 'student', select: 'username displayName' }, { path: 'supervisor.supervisor', select: 'username displayName' }, { path: 'supervisor.proposedSupervisor', select: 'username displayName' }, { path: 'master', select: 'username displayName' }, { path: 'consultedTeacher', select: 'username displayName' }, { path: 'deadlines.deadlines' }];
  }

  if (req.user.roles.includes('master')) {
    populateQuery = [{ path: 'student', select: 'username displayName' }, { path: 'supervisor.supervisor', select: 'username displayName firstname lastname' }, { path: 'supervisor.proposedSupervisor', select: 'username displayName' }, { path: 'master', select: 'username displayName' }, { path: 'consultedTeacher', select: 'username displayName' }];
    // populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor', select: 'username' }, { path: 'master', select: 'username' }];
  }

  if (req.user.roles.includes('manager.internships')) {
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.proposedSupervisor', select: 'username' }, { path: 'supervisor.supervisor', select: 'username displayName' }, { path: 'master', select: 'username' }];
  }

  if (req.user.roles.includes('coordinator')) {
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.proposedSupervisor', select: 'username displayName' }, { path: 'supervisor.supervisor', select: 'username displayName' }, { path: 'master', select: 'username displayName' }, { path: 'consultedTeacher', select: 'username displayName' }];
  }

  if (req.user.roles.includes('teacher')) {
    populateQuery = [{ path: 'supervisor.supervisor', select: 'username firstname lastname displayName' }, { path: 'supervisor.proposedSupervisor', select: 'username' }, { path: 'consultedTeacher', select: 'username displayName' }, { path: 'master', select: 'username displayName' }, { path: 'student', select: 'username firstname lastname' }];
  }

  if (req.user.roles.includes('admin')) {
    populateQuery = [{ path: 'student', select: 'firstname lastname username' }, { path: 'supervisor.proposedSupervisor', select: 'username displayName' }, { path: 'supervisor.supervisor', select: 'username firstname lastname displayName' }, { path: 'master', select: 'username firstname lastname displayName' }, { path: 'consultedTeacher', select: 'username firstname lastname displayName' }];
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

exports.createDeadlines = function (req, res) {
  console.log('in createDeadlines function');
  var deadlines = new Deadlines(req.body);

  deadlines.save(function (err) {  // pas besoin de mettre function (err, internship) pas besoin de lui passer qqchose pour le save.
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(deadlines); // on renvoie l'instance du modèle et non pas le modèle en lui même (evidemment, comme avece dkp)
  });
};

exports.create = function (req, res) {
  console.log('in create function');
  var internship = new Internship(req.body); // req.body permet de TOUT lui mettre, on mettra des infos en plus plus loin si besoin.

  // ! si un student crée le stage, le statut est d'office 'Enterprise Encoding'
  // si c'est un admin ou autre, ca dépendra du contenu.

  if (req.user.roles.includes('student')) {
    internship.student = req.user._id;
    internship.generalStatus = 'Enterprise Encoding';
    internship.state = 'Pre-internship';
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

exports.updateSupervisors = function (req, res) {
  console.log("in updateSupervisors function");
  req.body.internships.forEach(function(internship) {

    internship = stateMachine(internship);
    // !!!! le status n'est pas encore updaté!! on le recoit mais on ne le change pas.

    if (internship.supervisor) {
      console.log('enter');
      console.log(internship.supervisor);

      if (!internship.supervisor.supervisor) {
        Internship.update({ _id: internship._id }, { $unset: { 'supervisor.supervisor': "" } }, function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }

        });
      } else if (internship.supervisor.supervisor) {
        Internship.update({ _id: internship._id }, { $set: { 'supervisor.supervisor': internship.supervisor.supervisor, 'generalStatus': internship.generalStatus } }, function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }

        });
      } else {
        res.status(202).send({ message: 'nothing to do' });
      }
    }
  });
  res.status(202).send({ message: 'internships updated' });

};

exports.update = function (req, res) {

  console.log('in update function');

  var internship = req.internship;

  internship.state = req.body.state;
  internship.generalStatus = req.body.generalStatus;
  internship.student = req.body.student;
  internship.certificate = req.body.certificate;
  internship.writtenReport = req.body.writtenReport;
  internship.oralPresentation = req.body.oralPresentation;
  internship.journal = req.body.journal;
  internship.continuousEvaluation = req.body.continuousEvaluation;
  internship.firstVisit = req.body.firstVisit;
  internship.activitiesNote = req.body.activitiesNote;
  internship.convention = req.body.convention;
  internship.proposition = req.body.proposition;
  internship.managerApproval = req.body.managerApproval;
  internship.enterprise = req.body.enterprise;
  internship.consultedTeacher = req.body.consultedTeacher;
  internship.master = req.body.master;
  internship.supervisor = req.body.supervisor;
  internship.deadlines = req.body.deadlines;

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

exports.deadlinesByID = function (req, res, next, id) {
  console.log('in deadlinesByID server function');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Deadlines is invalid'
    });
  }

  Deadlines.findById(id).exec(function (err, deadlines) {
    if (err) {
      return next(err);
    }

    if (!deadlines) {
      return res.status(404).send({
        message: 'No Deadlines with that identifier has been found.'
      });
    }
    req.deadlines = deadlines;
    next();
  });
};

exports.updateEnterprise = function (req, res) {
  console.log('in updateEnterprise function');

  var internship = req.internship;
  if ((internship.enterprise.name) && (req.user.roles.includes('student'))) {
    return res.status(422).send({
      message: 'sorry, student cant edit enterprise'
    });
  }

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

  console.log(internship);

  internship = stateMachine(internship);
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

    internship.propositionLog.push(internship.proposition);

    internship.master = req.body.master;
    internship.supervisor = req.body.supervisor;
    internship.consultedTeacher = req.body.consultedTeacher;

    internship.proposition.theme = req.body.proposition.theme;
    internship.proposition.domain = req.body.proposition.domain;
    internship.proposition.location = req.body.proposition.location;
    internship.proposition.description = req.body.proposition.description;

    internship.proposition.approval = {};
    internship.proposition.approval.masterComment = '';
    internship.proposition.approval.masterApproval = null;
    internship.proposition.approval.coordinatorComment = '';
    internship.proposition.approval.coordinatorApproval = null;
    internship.proposition.approval.consultedTeacherComment = '';
    internship.proposition.approval.consultedTeacherApproval = null;
  }

  if ((internship.proposition.approval.coordinatorApproval === true) && (internship.proposition.approval.consultedTeacherApproval === true) && (req.body.proposition.approval.masterApproval === true)) {
    internship.proposition.approval.approved = true;
  }

  internship = stateMachine(internship);
  internship.save(function (err) {
    if (err) {
      console.log(err);
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

  internship = stateMachine(internship);
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

  if (req.user.roles.includes('student')) {
    internship.firstVisit.date = req.body.firstVisit.date;
    internship.firstVisit.location = req.body.firstVisit.location;
  } else if (req.user.roles.includes('teacher')) {
    internship.firstVisit.supervisorNotes = req.body.firstVisit.supervisorNotes;
    internship.firstVisit.supervisorValidation = req.body.firstVisit.supervisorValidation;
  } else if (req.user.roles.includes('master')) {
    internship.firstVisit.masterNotes = req.body.firstVisit.masterNotes;
    internship.firstVisit.masterValidation = req.body.firstVisit.masterValidation;
  }
  if ((internship.firstVisit.masterValidation) && (internship.firstVisit.supervisorValidation)) {
    internship.firstVisit.done = true;
  }

  internship = stateMachine(internship);
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
    internship.activitiesNote.approval.masterApproval = req.body.activitiesNote.approval.masterApproval;
    internship.activitiesNote.masterComment = req.body.activitiesNote.masterComment;
  } else if (req.user.roles.includes('teacher')) {
    internship.activitiesNote.approval.supervisorApproval = req.body.activitiesNote.approval.supervisorApproval;
    internship.activitiesNote.supervisorComment = req.body.activitiesNote.supervisorComment;
  } else if (req.user.roles.includes('student')) {
    internship.activitiesNoteLog.push(req.body.activitiesNote);
    internship.activitiesNote.approval.masterApproval = null;
    internship.activitiesNote.approval.supervisorApproval = null;
    internship.activitiesNote.masterComment = null;
    internship.activitiesNote.supervisorComment = null;
    internship.activitiesNote.generalObjectives = req.body.activitiesNote.generalObjectives;
  }

  internship = stateMachine(internship);
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
  internship.oralPresentation = req.body.oralPresentation;

  if (req.user.roles.includes('student')) {
    internship.oralPresentation.date = req.body.oralPresentation.date;
    internship.oralPresentation.location = req.body.oralPresentation.location;
  } else if (req.user.roles.includes('teacher')) {
    internship.oralPresentation.supervisorNotes = req.body.oralPresentation.supervisorNotes;
    internship.oralPresentation.supervisorValidation = req.body.oralPresentation.supervisorValidation;
  } else if (req.user.roles.includes('master')) {
    internship.oralPresentation.masterNotes = req.body.oralPresentation.masterNotes;
    internship.oralPresentation.masterValidation = req.body.oralPresentation.masterValidation;
  }
  if ((internship.oralPresentation.masterValidation) && (internship.oralPresentation.supervisorValidation)) {
    internship.oralPresentation.done = true;
  }

  internship = stateMachine(internship);
  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.validateInternships = function (req, res) {
  console.log("in validateInternships function");

  req.body.internships.forEach(function(internship) {
    if (internship.generalStatus === 'Validation') {
      internship = stateMachine(internship);
      if (req.user.roles.includes('validator')) {
        Internship.update({ _id: internship._id }, { $set: { 'validatorApproval': internship.validatorApproval, 'generalStatus': internship.generalStatus } }, function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
        });
      } else if (req.user.roles.includes('manager.internships')) {
        console.log('i am a manager');
        Internship.update({ _id: internship._id }, { $set: { 'managerApproval': internship.managerApproval, 'generalStatus': internship.generalStatus, 'state': internship.state } }, function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
        });
      }
    } else if (req.user.roles.includes('manager.internships')) {
      console.log('i am a manager');
      Internship.update({ _id: internship._id }, { $set: { 'managerApproval': internship.managerApproval, 'generalStatus': internship.generalStatus, 'state': internship.state } }, function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
      });
    }
  });
  res.status(202).send({ message: 'internships updated' });
};

exports.updateConvention = function (req, res) {
  console.log("in updateConvention function");

  req.body.internships.forEach(function(internship) {

    internship = stateMachine(internship);

    Internship.update({ _id: internship._id }, { $set: { 'convention.given': internship.convention.given, 'convention.validation': internship.convention.validation, 'generalStatus': internship.generalStatus, 'state': internship.state } }, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
    });
  });
  res.status(202).send({ message: 'internships updated' });
};

exports.updateSupervisor = function (req, res) {

  console.log('in updateSupervisor function');
  var internship = req.internship;

  if (req.user.roles.includes('student')) {
    internship.supervisor.proposedSupervisor = req.body.supervisor.proposedSupervisor;
    internship.supervisor.propositionResponse = null;
  }

  if (req.user.roles.includes('teacher')) {

    if (req.body.supervisor.propositionResponse === true) {
      console.log("accepted");
    } else if (req.body.supervisor.propositionResponse === false) {
      internship.supervisor.propositionResponseComment = req.body.supervisor.propositionResponseComment;
      console.log("refused");
    }
    internship.supervisor.propositionResponse = req.body.supervisor.propositionResponse;
  }

  if (req.user.roles.includes('manager.internships')) {
    console.log('i am a manager');
    internship.supervisor.supervisor = req.body.supervisor.supervisor;
    internship.supervisor.status = 'manager attributed supervisor';
  }

  if (req.user.roles.includes('validator')) {
    console.log('i am a validator');
    internship.supervisor.supervisor = req.body.supervisor.supervisor;
    internship.supervisor.status = 'validator attributed supervisor';
  }

  internship = stateMachine(internship);

  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.updateIntermediateEvaluation = function (req, res) {
  console.log('in editIntermediateEvaluation function');

  var internship = req.internship;
  internship.intermediateEvaluation = req.body.intermediateEvaluation;

  if (req.user.roles.includes('student')) {
    internship.intermediateEvaluation.date = req.body.intermediateEvaluation.date;
    internship.intermediateEvaluation.location = req.body.intermediateEvaluation.location;
  } else if (req.user.roles.includes('master')) {
    internship.intermediateEvaluation.masterNotes = req.body.intermediateEvaluation.masterNotes;
    internship.intermediateEvaluation.masterValidation = req.body.intermediateEvaluation.masterValidation;
  }
  if (internship.intermediateEvaluation.masterValidation) {
    internship.intermediateEvaluation.done = true;
  }

  internship = stateMachine(internship);
  internship.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(internship);
  });
};

exports.editStartEnd = function (req, res) {
  console.log('in editStartEnd function');

  req.body.internships.forEach(function(internship) {

    if (!internship.deadlines) {internship.deadlines = {}; }
    internship = stateMachine(internship);

    Internship.update({ _id: internship._id }, { $set: { 'deadlines.startInternship': internship.deadlines.startInternship, 'deadlines.endInternship': internship.deadlines.endInternship, 'generalStatus': internship.generalStatus } }, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
    });
  });
  res.status(202).send({ message: 'internships updated' });
};

function stateMachine(internship) {

  var status = internship.generalStatus;
  var state = internship.state;

  if (!status) {
    console.log("1");
    status = 'Enterprise Encoding';
  }

  if (!state) {
    state = 'Pre-internship';
  }

  if (status === 'Enterprise Encoding') {
    console.log("2");
    if (internship.enterprise) {
      status = 'Proposition Encoding';
    }
  }

  if (status === 'Proposition Encoding') {
    console.log("3");
    if (internship.proposition && internship.proposition.theme) {
      status = 'Proposition Validation';
    }
  }

  if (status === 'Proposition Reincoding') {
    console.log("3");
    if (internship.proposition && internship.proposition.theme) {
      status = 'Proposition Revalidation';
    }
  }

  if ((status === 'Proposition Validation') || (status === 'Proposition Revalidation')) {
    console.log("4");
    if (internship.proposition && internship.proposition.approval && (internship.proposition.approval.consultedTeacherApproval !== true || internship.proposition.approval.masterApproval !== true || internship.proposition.approval.coordinatorApproval !== true)) {
      console.log('check1');
      if (internship.proposition.approval.consultedTeacherApproval !== null && internship.proposition.approval.masterApproval !== null && internship.proposition.approval.coordinatorApproval !== null) {
        console.log('check2');
        status = 'Proposition Reincoding';
      }
    } else if (internship.proposition && internship.proposition.approval && internship.proposition.approval.consultedTeacherApproval === true && internship.proposition.approval.masterApproval === true && internship.proposition.approval.coordinatorApproval === true) {
      status = 'Supervisor Attribution';
    }
  }

  if (status === 'Supervisor Attribution') {
    console.log("5");
    if (internship.supervisor && internship.supervisor.supervisor) {
      status = 'Validation';
    }
  }

  if (status === 'Validation') {
    console.log('6');
    if (internship.managerApproval === true) {
      status = 'Convention Signing';
    }
  }

  if (status === 'Convention Signing') {
    console.log('7');
    if (internship.convention.given && internship.convention.validation) {
      status = 'Internship Start';
    }
  }

  if (status === 'Internship Start') {
    console.log('8');
    state = 'In Internship';
    if (true) { // trouver une condition, du style si le deadline d'avertissement de l'encodage est passé.
      status = 'Activities Note Encoding';
    }
  }

  if ((status === 'Activities Note Encoding') || (status === 'Activities Note Reincoding')) {
    console.log('9');
    state = 'In Internship';
    if (internship.activitiesNote.generalObjectives[0]) {
      status = 'Activities Note Validation';
    }
  }

  if (status === 'Activities Note Validation') {
    console.log('10');
    state = 'In Internship';
    if ((internship.activitiesNote.approval.masterApproval !== null) && (internship.activitiesNote.approval.supervisorApproval !== null)) {
      if ((!internship.activitiesNote.approval.masterApproval) || (!internship.activitiesNote.approval.supervisorApproval)) {
        status = 'Activities Note Reincoding';
      } else if ((internship.activitiesNote.approval.masterApproval) || (internship.activitiesNote.approval.supervisorApproval)) {
        status = 'Internship';
      }
    }
  }

  if (status === 'Activities Note Reincoding') {
    console.log('11');
    state = 'In Internship';

    if ((internship.activitiesNote.approval.supervisorApproval === true) && (internship.activitiesNote.approval.masterApproval === true)) {
      status = 'Internship';
    }
  }

  if (status === 'Internship') {
    console.log('12');
    if (true) {
      status = 'First Visit';
    }
  }

  if (status === 'First Visit') {
    console.log('13');
    if (internship.firstVisit.done) {
      status = 'InternshipMiddle';
    }
  }

  if (status === 'InternshipMiddle') {
    console.log('14');
    if (true) {
      status = 'Intermediate Evaluation';
    }
  }

  if (status === 'Intermediate Evaluation') {
    console.log('14');
    if (internship.intermediateEvaluation.masterValidation) {
      status = 'Oral Presentation';
    }
  }

  if (status === 'Oral Presentation') {
    console.log('15');
    if (internship.oralPresentation.done) {
      status = 'Final Delivery';
    }
  }

  if (status === 'Final Delivery') {
    console.log('16');
    state = 'Post Internship';
    if (true) {
      status = 'Final Delivery';
    }
  }

  console.log("return value: " + status);
  console.log("return value: " + state);
  internship.generalStatus = status;
  internship.state = state;
  return internship;
}
