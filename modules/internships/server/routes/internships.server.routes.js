'use strict';

/**
 * Module dependencies
 */
var internshipsPolicy = require('../policies/internships.server.policy'),
  internships = require('../controllers/internships.server.controller'),
  evaluationgrids = require('../controllers/evaluationgrid.server.controller');

module.exports = function(app) {
  // Internships collection routes
  app.route('/api/internships').all(internshipsPolicy.isAllowed)
    .get(internships.list)
    .post(internships.create);

  app.route('/api/internships/:internshipId').all(internshipsPolicy.isAllowed)
    .get(internships.read);

  app.route('/api/evaluationgrids').all(internshipsPolicy.isAllowed)
    .get(evaluationgrids.list);

  app.route('/api/evaluationgrids/:code').all(internshipsPolicy.isAllowed)
    .get(evaluationgrids.read);

  app.param('internshipId', internships.internshipByID)
     .param('code', evaluationgrids.gridByCode);
  // toutes les routes qui ont internshipID devront passer par a fonction internshiByID, puis par le .all(inter), pui .get etc..
};
