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
      .state('admin.manage.evalgrids.create', {
        url: '/create',
        templateUrl: 'modules/evalgrids/client/views/admin/form-evalgrid.client.view.html',
        controller: 'EvalGridsAdminController',
        controllerAs: 'vm',
        resolve: {
          evalgridResolve: newEvalGrid
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create an exam session'
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
      })
      .state('admin.manage.evalgrids.edit', {
        url: '/:evalgridCode/edit',
        templateUrl: 'modules/evalgrids/client/views/admin/form-evalgrid.client.view.html',
        controller: 'EvalGridsAdminController',
        controllerAs: 'vm',
        resolve: {
          evalgridResolve: getEvalGrid
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit an evaluation grid'
        }
      });
  }

  getEvalGrid.$inject = ['$stateParams', 'EvalGridsService'];

  function getEvalGrid($stateParams, EvalGridsService) {
    return EvalGridsService.get({
      evalgridCode: $stateParams.evalgridCode
    }).$promise;
  }

  newEvalGrid.$inject = ['EvalGridsService'];

  function newEvalGrid(EvalGridsService) {
    return new EvalGridsService();
  }
}());
