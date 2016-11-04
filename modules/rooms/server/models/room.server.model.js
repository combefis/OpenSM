'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Room Schema
 */
var RoomSchema = new Schema({
  code: {
    type: String,
    required: 'Please fill in the code.',
    trim: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
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

mongoose.model('Room', RoomSchema);
