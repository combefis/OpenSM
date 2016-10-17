'use strict';

/**
 * Module dependencies
 */
var roomsPolicy = require('../policies/rooms.server.policy'),
  rooms = require('../controllers/rooms.server.controller');

module.exports = function (app) {
  // Rooms collection routes
  app.route('/api/rooms').all(roomsPolicy.isAllowed)
    .get(rooms.list);
};
