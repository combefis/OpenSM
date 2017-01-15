'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke courses permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: [
        '/api/courses',
        '/api/courses/:courseCode'
      ],
      permissions: '*'
    }]
  }, {
    roles: ['manager.exams'],
    allows: [{
      resources: '/api/courses',
      permissions: ['get']
    }]
  }, {
    roles: ['teacher'],
    allows: [{
      resources: [
        '/api/courses',
        '/api/courses/:courseCode'
      ],
      permissions: ['get']
    }]
  }]);
};

/**
 * Check if courses policy allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check permission according to filter
  if (req.query.filter) {
    switch (req.query.filter) {
      case 'all':
        if (!(roles.includes('admin') || roles.includes('manager.exams'))) {
          return res.status(403).json({
            message: 'User is not authorized'
          });
        }
        break;

      case 'teacher':
        if (!roles.includes('teacher')) {
          return res.status(403).json({
            message: 'User is not authorized'
          });
        }
    }
  }

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
