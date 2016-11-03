'use strict';

/**
 * Module dependencies
 */
var roomsPolicy = require('../policies/rooms.server.policy'),
  rooms = require('../controllers/rooms.server.controller');

module.exports = function (app) {
  // Rooms collection routes
  app.route('/api/rooms').all(roomsPolicy.isAllowed)
    .get(rooms.list)
    .post(rooms.create);

  // Single room routes
  app.route('/api/rooms/:roomId').all(roomsPolicy.isAllowed)
    .get(rooms.read)
    .put(rooms.update);

  // Finish by binding the room middleware
  app.param('roomId', rooms.roomByID);
};
