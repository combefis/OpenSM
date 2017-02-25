'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke admin permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/users',
      permissions: '*'
    }, {
      resources: '/api/users/:userId',
      permissions: '*'
    }, {
      resources: '/api/teachers',
      permissions: '*'
    }, {
      resources: '/api/students',
      permissions: '*'
    }]
  }, {
    roles: ['manager.exams', 'master', 'manager.internships'],
    allows: [{
      resources: '/api/teachers',
      permissions: ['get']
    }, {
      resources: ['/api/students', '/api/students/:userId'],
      permissions: ['get']
    }]
  }]);
};

/**
 * Check if admin policy allows
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
