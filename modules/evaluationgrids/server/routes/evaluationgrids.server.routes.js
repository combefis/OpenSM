'use strict';

/**
 * Module dependencies
 */
var evaluationGridsPolicy = require('../policies/evaluationgrids.server.policy'),
  evaluationgrids = require('../controllers/evaluationgrid.server.controller');

module.exports = function(app) {
  // Internships collection routes

  app.route('/api/evaluationgrids').all(evaluationGridsPolicy.isAllowed)
    .get(evaluationgrids.list);

  app.route('/api/evaluationgrids/:code').all(evaluationGridsPolicy.isAllowed)
    .get(evaluationgrids.read);

  app.param('code', evaluationgrids.gridByCode);
  // toutes les routes qui ont internshipID devront passer par a fonction internshiByID, puis par le .all(inter), pui .get etc..
};
