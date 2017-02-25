(function () {
  'use strict';

  angular
    .module('core.manager.internships.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teacher', {
        abstract: true,
        url: '/teacher',
        template: '<ui-view/>',
        data: {
          roles: ['teacher']
        }
      })
      .state('teacher.manage', {
        abstract: true,
        url: '/manage',
        template: '<ui-view/>',
        data: {
          roles: ['teacher']
        }
      });
  }
}());
