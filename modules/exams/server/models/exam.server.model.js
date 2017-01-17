'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Exam Schema
 */
var ExamSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  course: {
    type: Schema.ObjectId,
    ref: 'Course',
    required: 'Please fill in the course of the exam.'
  },
  examsession: {
    type: Schema.ObjectId,
    ref: 'ExamSession'
  },
  date: {
    type: Date,
    required: 'Please fill in the date of the exam.'
  },
  duration: {
    type: Number,
    required: 'Please fill in the duration of the exam.'
  },
  registrations: {
    type: [{
      type: Schema.ObjectId,
      ref: 'User'
    }],
    default: []
  },
  copies: {
    type: [new Schema({
      name: {
        type: String,
        default: null
      },
      validated: {
        type: Boolean,
        default: false
      },
      origname: {
        type: String,
        default: null
      },
      created: {
        type: Date,
        default: Date.now
      },
      user: {
        type: Schema.ObjectId,
        ref: 'User'
      }
    }, {
      id: false,
      _id: false
    })],
    default: []
  },
  rooms: {
    type: [new Schema({
      room: {
        type: Schema.ObjectId,
        ref: 'Room'
      },
      configuration: {
        type: Number,
        default: null
      },
      startseat: {
        type: Number,
        default: 1
      }
    }, {
      id: false,
      _id: false
    })],
    default: []
  },
  academicyear: {
    type: Number
  },
  ready: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Exam', ExamSchema);
