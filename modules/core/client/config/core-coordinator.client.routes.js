(function () {
  'use strict';

  angular
    .module('core.coordinator.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('coordinator', {
        abstract: true,
        url: '/coordinator',
        template: '<ui-view/>',
        data: {
          roles: ['coordinator']
        }
      })
      .state('coordinator.manage', {
        abstract: true,
        url: '/manage',
        template: '<ui-view/>',
        data: {
          roles: ['coordinator']
        }
      });
  }
}());
