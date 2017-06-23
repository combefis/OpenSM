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
  building: {
    type: String,
    trim: true
  },
  floor: {
    type: Number
  },
  nbseats: {
    type: Number,
    required: 'Please fill in the number of seats of the room.'
  },
  equipments: {
    type: [{
      type: String,
      enum: ['blackboard', 'whiteboard', 'projector', 'data', 'ethernet']
    }],
    default: []
  },
  pictures: {
    type: Boolean,
    default: false
  },
  map: {
    type: Schema.Types.Mixed,
    default: null
  },
  configurations: {
    type: [new Schema({
      name: {
        type: String,
        default: 'Default configuration'
      },
      nbseries: {
        type: Number,
        default: 1
      },
      seats: {
        type: [new Schema({
          seat: {
            type: Number,
            default: 0
          },
          serie: {
            type: Number,
            default: 0
          }
        }, {
          id: false,
          _id: false
        })],
        default: []
      }
    }, {
      id: false,
      _id: false
    })],
    default: []
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
