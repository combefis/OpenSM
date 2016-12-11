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
  app.route('/api/rooms/:roomCode').all(roomsPolicy.isAllowed)
    .get(rooms.read)
    .put(rooms.update);

  // Room map routes
  app.route('/api/rooms/:roomCode/map').all(roomsPolicy.isAllowed)
    .get(rooms.getMap);

  // Finish by binding the room middleware
  app.param('roomCode', rooms.roomByCode);
};
