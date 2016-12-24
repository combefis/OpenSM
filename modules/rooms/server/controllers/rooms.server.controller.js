'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Room = mongoose.model('Room'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a room
 */
exports.create = function (req, res) {
  var room = new Room(req.body);
  room.user = req.user;

  // Save the room
  room.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(room);
  });
};

/**
 * Show the current room
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var room = req.room ? req.room.toJSON() : {};

  res.json(room);
};

/**
 * Update a room
 */
exports.update = function (req, res) {
  var room = req.room;

  room.code = req.body.code;
  room.name = req.body.name;
  room.nbseats = req.body.nbseats;

  room.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(room);
  });
};

/*
 * Delete a room
 */
exports.delete = function (req, res) {
  var room = req.room;

  // Check if can be deleted
  if (!room) {
    return res.status(400).send({
      message: 'Cannot delete an exam session with exams'
    });
  }

  room.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(room);
  });
};

/**
 * List of rooms
 */
exports.list = function (req, res) {
  Room.find({}, 'code name')
  .sort({ code: 1 })
  .exec(function (err, rooms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(rooms);
  });
};

/**
 * Room middleware
 */
exports.roomByCode = function (req, res, next, code) {
  Room.findOne({ 'code': code }, 'code name nbseats equipments pictures map configurations')
  .exec(function (err, room) {
    if (err) {
      return next(err);
    }
    if (!room) {
      return res.status(404).send({
        message: 'No room with that code has been found.'
      });
    }

    req.room = room;
    next();
  });
};
