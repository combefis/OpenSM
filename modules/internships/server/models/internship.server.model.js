'use strict';

// Module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;   // create instance of mongoose schema, called Schema.


// Internship Schema
var IntershipSchema = new Schema({
  student: {
    type: Number,
    required: true
  },
  master: {
    type: String
  },
  supervisor: {
    teacher: String,
    status: String
  },
  proposition: {
    theme: String,
    domain: String,
    location: String,
    description: {
      description: String,
      subjectApproval: {
        consultedTeacher: String,
        consultedTeacherApproval: Boolean,
        unitChiefApproval: Boolean,
        masterApproval: Boolean
      },
      validatorApproval: Boolean
    }
  },
  convention: {
    validation: Boolean
  },
  activitiesNote: {
    generalObjectives: [String],
    specificObjectives: [String],
    approval: Boolean
  },
  firstVisit: {
    date: Date,
    location: String,
    supervisorNotes: String
  },
  intermediateEvaluation: {
    masterNotes: String
  },
  continuousEvaluation: {
    points: [Number]
  },
  oralPresentation: {
    date: Date,
    location: String,
    points: [Number]
  },
  writtenReport: {
    handedIn: Boolean,
    points: [Number]
  },
  certificate: {
    handedIn: Boolean
  },
  deadlines: {
    endInternship: Date,
    writtenReport: Date,
    certificate: Date
  },
  finalPoints: { type: Number }
});

mongoose.model('Internship', IntershipSchema);
