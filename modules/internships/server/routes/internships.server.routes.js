'use strict';

// module dependencies
var internshipsPolicy = require('../policies/internships.server.policy'),
  internships = require('../controllers/internships.server.controller');


module.exports = function(app) {
// internship collection routes
  app.route('/api/internships').all(internshipsPolicy.isAllowed).get(internships.list);
};
