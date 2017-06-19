'use strict';

// Module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;   // create instance of mongoose schema, called Schema.


// Internship Schema
var IntershipSchema = new Schema({

  generalStatus: String,
  state: String,

  validatorApproval: { type: Boolean, default: false },
  managerApproval: { type: Boolean, default: false },

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
    propositionResponse: Boolean,
    propositionResponseComment: String,
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
      consultedTeacherApproval: { type: Boolean, default: null },
      consultedTeacherComment: String,
      coordinatorApproval: { type: Boolean, default: null },
      coordinatorComment: String,
      masterApproval: { type: Boolean, default: null },
      masterComment: String,
      approved: { type: Boolean, default: null }
    }
  },

  propositionLog: Array,

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
    given: { type: Boolean, default: 'false' },
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
    approval: {
      supervisorApproval: { type: Boolean, default: null },
      masterApproval: { type: Boolean, default: null }
    },
    masterComment: String,
    supervisorComment: String
  },

  activitiesNoteLog: Array,

  firstVisit: {
    date: Date,
    location: String,
    done: { type: Boolean, default: null },
    supervisorNotes: {
      type: [new Schema({ value: String }, { id: false, _id: false })],
      default: []
    },
    masterNotes: {
      type: [new Schema({ value: String }, { id: false, _id: false })],
      default: []
    },
    supervisorValidation: { type: Boolean, default: false },
    masterValidation: { type: Boolean, default: false }
  },
  intermediateEvaluation: {
    location: String,
    date: Date,
    done: { type: Boolean, default: null },
    masterValidation: { type: Boolean, default: false },
    masterNotes: {
      type: [new Schema({ value: String }, { id: false, _id: false })],
      default: []
    }
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
    points: [Number],
    done: { type: Boolean, default: null },
    supervisorNotes: {
      type: [new Schema({ value: String }, { id: false, _id: false })],
      default: []
    },
    masterNotes: {
      type: [new Schema({ value: String }, { id: false, _id: false })],
      default: []
    },
    supervisorValidation: { type: Boolean, default: false },
    masterValidation: { type: Boolean, default: false }
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
    deadlines: {
      type: Schema.ObjectId,
      ref: 'Deadlines'
    }
  },
  finalPoints: { type: Number }
});

mongoose.model('Internship', IntershipSchema);
