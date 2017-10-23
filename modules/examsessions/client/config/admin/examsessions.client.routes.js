(function() {
  'use strict';

  angular
    .module('examsessions.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.manage.examsessions', {
        abstract: true,
        url: '/examsessions',
        template: '<ui-view/>'
      })
      .state('admin.manage.examsessions.list', {
        url: '',
        templateUrl: '/modules/examsessions/client/views/admin/list-examsessions.client.view.html',
        controller: 'ExamSessionsListAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Exam sessions'
        }
      })
      .state('admin.manage.examsessions.create', {
        url: '/create',
        templateUrl: '/modules/examsessions/client/views/admin/form-examsession.client.view.html',
        controller: 'ExamSessionsAdminController',
        controllerAs: 'vm',
        resolve: {
          examsessionResolve: newExamSession
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create an exam session'
        }
      })
      .state('admin.manage.examsessions.view', {
        url: '/:examsessionCode',
        templateUrl: '/modules/examsessions/client/views/admin/view-examsession.client.view.html',
        controller: 'ExamSessionsAdminController',
        controllerAs: 'vm',
        resolve: {
          examsessionResolve: getExamSession
        },
        data: {
          roles: ['admin'],
          pageTitle: '{{examsessionResolve.name}}'
        }
      })
      .state('admin.manage.examsessions.edit', {
        url: '/:examsessionCode/edit',
        templateUrl: '/modules/examsessions/client/views/admin/form-examsession.client.view.html',
        controller: 'ExamSessionsAdminController',
        controllerAs: 'vm',
        resolve: {
          examsessionResolve: getExamSession
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit an exam session'
        }
      });
  }

  getExamSession.$inject = ['$stateParams', 'ExamSessionsService'];

  function getExamSession($stateParams, ExamSessionsService) {
    return ExamSessionsService.get({
      examsessionCode: $stateParams.examsessionCode
    }).$promise;
  }

  newExamSession.$inject = ['ExamSessionsService'];

  function newExamSession(ExamSessionsService) {
    return new ExamSessionsService();
  }
}());
