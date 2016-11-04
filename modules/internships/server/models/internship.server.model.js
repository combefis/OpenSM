'use strict';

// Module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;   // create instance of mongoose schema, called Schema.


// Internship Schema
var IntershipSchema = new Schema({
  student: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  master: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  supervisor: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  proposition: {
    theme: String,
    domain: String,
    description: {
      description: String,
      subjectApproval: {
        consultedTeacher: {
          type: Schema.ObjectId,
          ref: 'User'
        },
        consultedTeacherApproval: Boolean,
        unitChiefApproval: Boolean,
        masterApproval: Boolean
      },
      validatorApproval: Boolean
    }
  },
  enterprise: {
    name: String,
    domain: String,
    address: {
      street: String,
      number: Number,
      postalCode: Number,
      city: String,
      country: String
    },
    phoneNumber: Number,
    fax: Number,
    mail: String,
    Representative: {
      name: String,
      position: String
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
