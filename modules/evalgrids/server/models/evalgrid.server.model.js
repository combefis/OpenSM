'use strict';

/*
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/*
 * EvalGrid Schema
 */
var EvalGridSchema = new Schema({
  code: {
    type: String,
    required: 'Please fill in the code of the evaluation grid.',
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: 'Please fill in the name of the evaluation grid.',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  categories: {
    type: [new Schema({
      name: {
        type: String,
        trim: true
      },
      criteria: {
        type: [new Schema({
          text: {
            type: String,
            trim: true
          },
          evaltype: {
            type: String,
            enum: ['score']
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

mongoose.model('EvalGrid', EvalGridSchema);
