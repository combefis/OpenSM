(function () {
  'use strict';

  angular
    .module('core.manager.internships.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('manager', {
        abstract: true,
        url: '/master',
        template: '<ui-view/>',
        data: {
          roles: ['manager.internships']
        }
      })
      .state('manager.manage', {
        abstract: true,
        url: '/manage',
        template: '<ui-view/>',
        data: {
          roles: ['manager.internships']
        }
      });
  }
}());
