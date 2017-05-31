'use strict';

/**
 * Module dependencies
 */
var academicyearsPolicy = require('../policies/academicyears.server.policy'),
  academicyears = require('../controllers/academicyears.server.controller');

module.exports = function (app) {
  // Academic years collection routes
  app.route('/api/academicyears').all(academicyearsPolicy.isAllowed)
    .get(academicyears.list)
    .post(academicyears.create);

  // Single academic year routes
  app.route('/api/academicyears/:academicyearCode').all(academicyearsPolicy.isAllowed)
    .get(academicyears.read)
    .put(academicyears.update)
    .delete(academicyears.delete);

  // Finish by binding the academic year middleware
  app.param('academicyearCode', academicyears.academicyearByCode);
};
