'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke internships permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/internships',
      permissions: '*'
    }]
  }, {
    roles: ['student'],
    allows: [{
      resources: '/api/myinternships',
      permissions: '*'
    }]
  }
  ]);
};


/**
 * Check if internships policy allows
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
