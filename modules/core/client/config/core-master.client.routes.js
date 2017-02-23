(function () {
  'use strict';

  angular
    .module('core.master.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('master', {
        abstract: true,
        url: '/master',
        template: '<ui-view/>',
        data: {
          roles: ['master']
        }
      })
      .state('master.manage', {
        abstract: true,
        url: '/manage',
        template: '<ui-view/>',
        data: {
          roles: ['master']
        }
      });
  }
}());
