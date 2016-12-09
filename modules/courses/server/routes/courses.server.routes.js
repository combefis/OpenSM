'use strict';

/**
 * Module dependencies
 */
var coursesPolicy = require('../policies/courses.server.policy'),
  courses = require('../controllers/courses.server.controller');

module.exports = function (app) {
  // Courses collection routes
  app.route('/api/courses').all(coursesPolicy.isAllowed)
    .get(courses.list)
    .post(courses.create);

  // Single course routes
  app.route('/api/courses/:courseCode').all(coursesPolicy.isAllowed)
    .get(courses.read)
    .put(courses.update);

  // Finish by binding the course middleware
  app.param('courseCode', courses.courseByCode);
};
