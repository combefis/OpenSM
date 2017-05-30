'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke exams permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: [
        '/api/exams',
        '/api/exams/:examId',
        '/api/exams/:examId/validate',
        '/api/exams/:examId/assignseats',
        '/api/exams/:examId/student',
        '/api/exams/:examId/student/:i',
        '/api/exams/:examId/room',
        '/api/exams/:examId/room/:i',
        '/api/exams/:examId/room/:i/configure',
        '/api/exams/:examId/room/:i/map',
        '/api/exams/:examId/copy',
        '/api/exams/:examId/copy/:i',
        '/api/exams/:examId/copy/:i/download',
        '/api/exams/:examId/copy/:i/upload',
        '/api/exams/:examId/copy/:i/validate',
        '/api/exams/:examId/copies/validate',
        '/api/exams/:examId/copies/generate',
        '/api/exams/:examId/copies/markasprinted'
      ],
      permissions: '*'
    }]
  }, {
    roles: ['manager.exams'],
    allows: [{
      resources: [
        '/api/exams',
        '/api/exams/:examId/student',
        '/api/exams/:examId/room',
        '/api/exams/:examId/room/:i/configure',
        '/api/exams/:examId/validate',
        '/api/exams/:examId/assignseats'
      ],
      permissions: ['post']
    }, {
      resources: '/api/exams/:examId',
      permissions: ['get', 'put', 'delete']
    }, {
      resources: [
        '/api/exams/:examId/copy/:i/download',
        '/api/exams/:examId/room/:i/map'
      ],
      permissions: ['get']
    }, {
      resources: [
        '/api/exams/:examId/student/:i',
        '/api/exams/:examId/room/:i'
      ],
      permissions: ['delete']
    }]
  }, {
    roles: ['teacher'],
    allows: [{
      resources: [
        '/api/exams/:examId',
        '/api/exams/:examId/copy/:i/download'
      ],
      permissions: ['get']
    }, {
      resources: [
        '/api/exams/:examId/copy',
        '/api/exams/:examId/copy/:i/upload',
        '/api/exams/:examId/copy/:i/validate',
        '/api/exams/:examId/copies/validate'
      ],
      permissions: ['post']
    }, {
      resources: ['/api/exams/:examId/copy/:i'],
      permissions: ['delete']
    }]
  }, {
    roles: ['printer'],
    allows: [{
      resources: [
        '/api/exams/:examId',
        '/api/exams/:examId/copy/:i/download',
        '/api/exams/:examId/copies/download'
      ],
      permissions: ['get']
    }, {
      resources: [
        '/api/exams/:examId/copies/generate',
        '/api/exams/:examId/copies/markasprinted'
      ],
      permissions: ['post']
    }]
  }]);
};

/**
 * Check if exams policy allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    }
    if (isAllowed) {
      // Access granted! Invoke next middleware
      return next();
    }
    return res.status(403).json({
      message: 'User is not authorized'
    });
  });
};
