'use strict';

/**
 * Module dependencies
 */
var coursesPolicy = require('../policies/courses.server.policy'),
  courses = require('../controllers/courses.server.controller');

module.exports = function (app) {
  // Courses collection routes
  app.route('/api/courses').all(coursesPolicy.isAllowed)
    .get(courses.list);
};
