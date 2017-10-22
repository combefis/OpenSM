'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator'),
  Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
  code: {
    type: String,
    required: 'Please fill in the code of the activity.',
    trim: true
  },
  name: {
    type: String,
    trim: true,
    required: 'Please fill in the name of the activity.'
  },
  teachers: {
    type: [{
      type: Schema.ObjectId,
      ref: 'User'
    }],
    required: 'Please fill in the teacher(s) of the activity.'
  },
  hours: {
    type: Number,
    required: 'Please fill in the number of hours of the activity.'
  },
  evaluations: {
    type: [{
      type: String,
      enum: ['written', 'oral', 'assignment', 'project']
    }],
    default: []
  },
  description: {
    type: String,
    trim: true
  },
  academicyear: {
    type: Number,
    required: 'Please fill in the academic year of the activity.'
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

ActivitySchema.index({ academicyear: -1, code: 1 }, { unique: true });
ActivitySchema.plugin(uniqueValidator, {
  message: 'An activity with the same code already exists in the specified academic year.'
});

mongoose.model('Activity', ActivitySchema);
