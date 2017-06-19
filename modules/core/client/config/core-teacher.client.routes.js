(function () {
  'use strict';

  angular
    .module('core.teacher.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teacher', {
        abstract: true,
        url: '',
        template: '<ui-view/>',
        data: {
          roles: ['teacher', 'coordinator', 'validator']
        }
      })
      .state('teacher.manage', {
        abstract: true,
        url: '/manage',
        template: '<ui-view/>',
        data: {
          roles: ['teacher', 'coordinator', 'validator']
        }
      });
  }
}());
