(function () {
  'use strict';

  angular
    .module('examsessions.routes')
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
        templateUrl: 'modules/examsessions/client/views/list-examsessions.client.view.html',
        controller: 'ExamSessionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Exam sessions'
        }
      })
      .state('admin.manage.examsessions.create', {
        url: '/create',
        templateUrl: 'modules/examsessions/client/views/form-examsession.client.view.html',
        controller: 'ExamSessionsController',
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
        url: '/:examsessionId',
        templateUrl: 'modules/examsessions/client/views/view-examsession.client.view.html',
        controller: 'ExamSessionsController',
        controllerAs: 'vm',
        resolve: {
          examsessionResolve: getExamSession
        },
        data: {
          pageTitle: '{{examsessionResolve.name}}'
        }
      });
  }

  getExamSession.$inject = ['$stateParams', 'ExamSessionsService'];

  function getExamSession($stateParams, ExamSessionsService) {
    return ExamSessionsService.get({
      examsessionId: $stateParams.examsessionId
    }).$promise;
  }

  newExamSession.$inject = ['ExamSessionsService'];

  function newExamSession(ExamSessionsService) {
    return new ExamSessionsService();
  }
}());
