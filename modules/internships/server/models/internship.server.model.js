'use strict';

//Module dependencies
var mongoose = require('mongoose'),
schema = mongoose.Schema;	//create instance of mongoose schema, called Schema.


//Internship Schema
var intershipSchema = new schema({
	student:{type:int,required:true},
	master:{type:String},
	supervisor:{
		teacher:String,
		status:String
	},
	proposition:{
		theme:String,
		domain:String,
		location:String,
		description:{
			description:String,
			subjectApproval:{
				consultedTeacher:String,
				consultedTeacherApproval:boolean,
				unitChiefApproval:boolean,
				masterApproval:boolean
			}
			validatorApproval:boolean
		}

	},
	convention:{
		validation:boolean
	},
	activitiesNote:{
		generalObjectives:[String],
		specificObjectives:[String],
		approval:boolean
	},
	firstVisit{
		date:Date,
		location:String,
		supervisorNotes:String
	},
	intermediateEvaluation{
		masterNotes:String
	},
	continuousEvaluation{
		points[int]
	},
	oralPresentation{
		date:Date,
		location:String,
		points[int]
	},
	writtenReport{
		handedIn:boolean,
		points[int]
	},
	certificate{
		handedIn:boolean
	},
	deadlines{
		endInternship:Date,
		writtenReport:Date,
		certificate:Date
	},
	finalPoints{type:int}
})

mongoose.model('Internship',intershipSchema);