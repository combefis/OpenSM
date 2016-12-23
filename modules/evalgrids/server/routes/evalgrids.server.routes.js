'use strict';

/**
 * Module dependencies
 */
var evalgridsPolicy = require('../policies/evalgrids.server.policy'),
  evalgrids = require('../controllers/evalgrids.server.controller');

module.exports = function(app) {
  // Evalgrids collection routes
  app.route('/api/evalgrids').all(evalgridsPolicy.isAllowed)
    .get(evalgrids.list);

  // Single evalgrid routes
  app.route('/api/evalgrids/:evalgridCode').all(evalgridsPolicy.isAllowed)
    .get(evalgrids.read);

  // Finish by binding the evalgrid middleware
  app.param('evalgridCode', evalgrids.evalgridByCode);
};
