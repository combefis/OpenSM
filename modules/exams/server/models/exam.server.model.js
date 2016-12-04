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
    type: [{
      type: String
    }],
    default: []
  },
  rooms: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Room'
    }],
    default: []
  },
  academicyear: {
    type: Number
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
