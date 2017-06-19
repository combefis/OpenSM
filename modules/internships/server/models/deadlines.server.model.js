'use strict';

// Module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;   // create instance of mongoose schema, called Schema.

// Deadlines Schema
var DeadlinesSchema = new Schema({

  academicYear: String,
  coordinatorMeeting: Date,
  foreignInternshipDemand: Date,
  convention: Date,
  activitiesNote: Date,
  firstVisit: Date,
  autoEvaluation: Date,
  oralPresentation: Date,
  writtenReport: Date,
  completeEvaluation: Date
});

mongoose.model('Deadlines', DeadlinesSchema);
