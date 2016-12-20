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
  validator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  proposition: {
    theme: String,
    domain: String,
    location: String,
    description: String,
    approval: {
      consultedTeacher: {
        type: Schema.ObjectId,
        ref: 'User'
      },
      consultedTeacherApproval: Boolean,
      unitChiefApproval: Boolean,
      masterApproval: Boolean,
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
    representative: {
      name: String,
      position: String
    }
  },
  convention: {
    validation: Boolean
  },
  activitiesNote: {
    generalObjectives: [new Schema({ value: String }, { id: false, _id: false })],
    specificObjectives: [new Schema({ value: String }, { id: false, _id: false })],
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
