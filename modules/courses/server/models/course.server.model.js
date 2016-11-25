'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({
  code: {
    type: String,
    required: 'Please fill in the code of the course.',
    trim: true,
    unique: true
  },
  name: {
    type: String,
    trim: true,
    required: 'Please fill in the name of the course.'
  },
  coordinator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Please fill in the coordinator of the course.'
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

mongoose.model('Course', CourseSchema);
