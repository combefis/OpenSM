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
    required: 'Please fill in the code of the room.',
    trim: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  nbseats: {
    type: Number,
    required: 'Please fill in the number of seats of the room.'
  },
  pictures: {
    type: Boolean,
    default: false
  },
  map: {
    type: Schema.Types.Mixed,
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
});

mongoose.model('Room', RoomSchema);
