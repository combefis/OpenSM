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
  acl.allow([
    {
      roles: ['admin'],
      allows: [{
        resources: ['/api/internships', '/api/internships/:internshipId'],
        permissions: '*'
      }]
    },
    {
      roles: ['student'],
      allows: [{
        resources: [
          '/api/internships',
          '/api/internships/deadlines',
          '/api/internships/:internshipId',
          '/api/internships/:internshipId/editEnterprise',
          '/api/internships/:internshipId/editProposition',
          '/api/internships/:internshipId/editJournal',
          '/api/internships/:internshipId/editFirstVisit',
          '/api/internships/:internshipId/editActivitiesNote',
          '/api/internships/:internshipId/editOralPresentation',
          '/api/internships/:internshipId/editIntermediateEvaluation',
          '/api/internships/:internshipId/editSupervisor'],
        permissions: '*'
      }]
    },
    {
      roles: ['master'],
      allows: [{
        resources: [
          '/api/internships',
          '/api/internships/:internshipId',
          '/api/internships/:internshipId/editProposition',
          '/api/internships/:internshipId/editFirstVisit',
          '/api/internships/:internshipId/editOralPresentation',
          '/api/internships/:internshipId/editIntermediateEvaluation',
          '/api/internships/:internshipId/editActivitiesNote'],
        permissions: '*'
      }]
    },
    {
      roles: ['manager.internships'],
      allows: [{
        resources: [
          '/api/internships',
          '/api/internships/supervisors',
          '/api/internships/convention',
          '/api/internships/startEndDates',
          '/api/internships/deadlines',
          '/api/internships/deadlines/:deadlinesId',
          '/api/internships/:internshipId',
          '/api/internships/validation',
          '/api/internships/:internshipId/editSupervisor',
          '/api/internships/:internshipId/deliverables',
          '/api/internships/:internshipId/editEnterprise'
        ],
        permissions: '*'
      }]
    },
    {
      roles: ['teacher'],
      allows: [{
        resources: [
          '/api/internships',
          '/api/internships/:internshipId',
          '/api/internships/:internshipId/editProposition',
          '/api/internships/:internshipId/editFirstVisit',
          '/api/internships/:internshipId/editSupervisor',
          '/api/internships/:internshipId/editOralPresentation',
          '/api/internships/:internshipId/editActivitiesNote'
        ],
        permissions: '*'
      }]
    },
    {
      roles: ['coordinator'],
      allows: [{
        resources: [
          '/api/internships',
          '/api/internships/supervisors',
          '/api/internships/:internshipId',
          '/api/internships/:internshipId/editProposition'
        ],
        permissions: '*'
      }]
    },
    {
      roles: ['validator'],
      allows: [{
        resources: [
          '/api/internships',
          '/api/teachers/',
          '/api/internships/supervisors',
          '/api/internships/validation',
          '/api/internships/:internshipId',
          '/api/internships/:internshipId/editProposition'
        ],
        permissions: '*'
      }]
    }
  ]);
};


/**
 * Check if internships policy allows DONT TOUCH:
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  if (true) { console.log('mettre toutes les conditions ici. suivi dun res403 si pas bon et rien si ok. ');}

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    }
    if (isAllowed) {
      // Access granted! Invoke next middleware
      // un gros if de la mort qui tue. on aura des if dans tous les sens.
      //
      return next();
    }
    return res.status(403).json({
      message: 'User is not authorized'
    });
  });
};
