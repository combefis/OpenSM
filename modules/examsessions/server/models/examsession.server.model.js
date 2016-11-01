'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * ExamSession Schema
 */
var ExamSessionSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill in the name of the exam session.',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  start: {
    type: Date,
    required: 'Please fill in the start date of the exam session.'
  },
  end: {
    type: Date,
    required: 'Please fill in the end date of the exam session.'
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

mongoose.model('ExamSession', ExamSessionSchema);
