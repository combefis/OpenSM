'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
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
  description: {
    type: String,
    trim: true
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

mongoose.model('Activity', ActivitySchema);
