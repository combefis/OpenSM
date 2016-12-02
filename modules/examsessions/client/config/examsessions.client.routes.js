(function () {
  'use strict';

  angular
    .module('examsessions.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('manage.examsessions', {
        abstract: true,
        url: '/examsessions',
        template: '<ui-view/>'
      })
      .state('manage.examsessions.list', {
        url: '',
        templateUrl: 'modules/examsessions/client/views/list-examsessions.client.view.html',
        controller: 'ExamSessionsListController',
        controllerAs: 'vm',
        data: {
          roles: ['manager.exams'],
          pageTitle: 'Exam sessions'
        }
      })
      .state('manage.examsessions.create', {
        url: '/create',
        templateUrl: 'modules/examsessions/client/views/form-examsession.client.view.html',
        controller: 'ExamSessionsController',
        controllerAs: 'vm',
        resolve: {
          examsessionResolve: newExamSession
        },
        data: {
          roles: ['manager.exams'],
          pageTitle: 'Create an exam session'
        }
      })
      .state('manage.examsessions.view', {
        url: '/:examsessionId',
        templateUrl: 'modules/examsessions/client/views/view-examsession.client.view.html',
        controller: 'ExamSessionsController',
        controllerAs: 'vm',
        resolve: {
          examsessionResolve: getExamSession
        },
        data: {
          roles: ['manager.exams'],
          pageTitle: '{{examsessionResolve.name}}'
        }
      })
      .state('manage.examsessions.edit', {
        url: '/:examsessionId/edit',
        templateUrl: 'modules/examsessions/client/views/form-examsession.client.view.html',
        controller: 'ExamSessionsController',
        controllerAs: 'vm',
        resolve: {
          examsessionResolve: getExamSession
        },
        data: {
          roles: ['manager.exams'],
          pageTitle: 'Edit an exam session'
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
