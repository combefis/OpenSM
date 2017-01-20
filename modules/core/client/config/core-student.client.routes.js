(function () {
  'use strict';

  angular
    .module('core.student.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('student', {
        abstract: true,
        url: '/student',
        template: '<ui-view/>',
        data: {
          roles: ['student']
        }
      })
      .state('student.manage', {
        abstract: true,
        url: '/manage',
        template: '<ui-view/>',
        data: {
          roles: ['student']
        }
      });
  }
}());
