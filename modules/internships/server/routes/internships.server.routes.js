'use strict';

/**
 * Module dependencies
 */
var internshipsPolicy = require('../policies/internships.server.policy'),
  internships = require('../controllers/internships.server.controller');


module.exports = function(app) {
  // Internships collection routes
  app.route('/api/internships').all(internshipsPolicy.isAllowed)
    .get(internships.list);
};
