(function () {
  'use strict';

  angular
    .module('evalgrids.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.manage.evalgrids', {
        abstract: true,
        url: '/evalgrids',
        template: '<ui-view/>'
      })
      .state('admin.manage.evalgrids.list', {
        url: '',
        templateUrl: 'modules/evalgrids/client/views/admin/list-evalgrids.client.view.html',
        controller: 'EvalGridsListAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Evaluation grids'
        }
      })
      .state('admin.manage.evalgrids.view', {
        url: '/:evalgridCode',
        templateUrl: 'modules/evalgrids/client/views/admin/view-evalgrid.client.view.html',
        controller: 'EvalGridsAdminController',
        controllerAs: 'vm',
        resolve: {
          evalgridResolve: getEvalGrid
        },
        data: {
          roles: ['admin'],
          pageTitle: '{{evalgridResolve.code}} — {{evalgridResolve.name}}'
        }
      });
  }

  getEvalGrid.$inject = ['$stateParams', 'EvalGridsService'];

  function getEvalGrid($stateParams, EvalGridsService) {
    return EvalGridsService.get({
      evalgridCode: $stateParams.evalgridCode
    }).$promise;
  }
}());
