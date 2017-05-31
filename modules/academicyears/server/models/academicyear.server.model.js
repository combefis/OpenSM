'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * AcademicYear Schema
 */
var AcademicYearSchema = new Schema({
  code: {
    type: Number,
    required: 'Please fill in the code of the academic year.',
    trim: true,
    unique: true
  },
  start: {
    type: Date,
    required: 'Please fill in the start date of the academic year.'
  },
  end: {
    type: Date,
    required: 'Please fill in the end date of the academic year.'
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

mongoose.model('AcademicYear', AcademicYearSchema);
