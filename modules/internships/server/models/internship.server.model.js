'use strict';

// Module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;   // create instance of mongoose schema, called Schema.


// Internship Schema
var IntershipSchema = new Schema({

  generalStatus: String,
  validatorApproval: Boolean,

  student: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  master: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  supervisor: {
    supervisor: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    proposedSupervisor: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    propositionResponse: String,
    status: String,
    attributed: Boolean
  },
  validator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  consultedTeacher: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  supervisorStatus: String,
  supervisorApproval: Boolean,
  coordinatorApproval: Boolean,

  proposition: {
    theme: String,
    domain: String,
    location: String,
    description: String,
    approval: {
      consultedTeacherApproval: String,
      consultedTeacherComment: String,
      coordinatorApproval: String,
      coordinatorComment: String,
      masterApproval: String,
      masterComment: String,
      approved: Boolean
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
    representative: {
      name: String,
      position: String
    }
  },
  convention: {
    validation: { type: Boolean, default: 'false' }
  },
  activitiesNote: {
    generalObjectives: {
      type: [new Schema({
        value: String,
        specificObjectives:
                  [new Schema({
                    value: String
                  },
                  { id: false, _id: false })]
      }, { id: false, _id: false })]
    },
    approval: Boolean,
    masterComment: String
  },
  firstVisit: {
    date: Date,
    location: String,
    supervisorNotes: String
  },
  intermediateEvaluation: {
    location: String,
    date: Date,
    masterNotes: String
  },
  continuousEvaluation: {
    points: [Number]
  },
  journal: {
    entries: {
      type: [new Schema({ date: Date, note: String }, { id: false, _id: false })],
      default: []
    }
  },
  oralPresentation: {
    date: Date,
    location: String,
    points: [Number]
  },
  writtenReport: {
    handedIn: { type: Boolean, default: 'false' },
    points: [Number]
  },
  certificate: {
    handedIn: { type: Boolean, default: 'false' }
  },
  deadlines: {
    startInternship: Date,
    endInternship: Date,
    writtenReport: Date,
    certificate: Date
  },
  finalPoints: { type: Number }
});

mongoose.model('Internship', IntershipSchema);
