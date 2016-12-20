'use strict';

// Module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;   // create instance of mongoose schema, called Schema.


// Internship Schema
var EvaluationGrid = new Schema({
  category: String,
  year: String,
  GeneralCriteria: {
    Behaviour: [new Schema({ field: String }, { details: String }, { id: false, _id: false })],
    Relationship: [new Schema({ field: String }, { details: String }, { id: false, _id: false })],
    Motivation: [new Schema({ field: String }, { details: String }, { id: false, _id: false })]
  },
  ContinuousEvaluation: {
    Professionalism: [new Schema({ field: String }, { details: String }, { id: false, _id: false })],
    ProjectManagement: [new Schema({ field: String }, { details: String }, { id: false, _id: false })]
  },
  OralPresentation: {
    Criteria: [new Schema({ field: String }, { details: String }, { id: false, _id: false })]
  },
  WrittenReport: {
    Criteria: [new Schema({ field: String }, { details: String }, { id: false, _id: false })]
  },
  Recap: {
    NotesAndRemarks: [new Schema({ field: String }, { id: false, _id: false })]
  }
});

mongoose.model('EvaluationGrid', EvaluationGrid);
