(function () {
  'use strict';

  angular
    .module('examsessions.manager.routes')
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
        templateUrl: 'modules/examsessions/client/views/manager/list-examsessions.client.view.html',
        controller: 'ExamSessionsListManagerController',
        controllerAs: 'vm',
        data: {
          roles: ['manager.exams'],
          pageTitle: 'Exam sessions'
        }
      })
      .state('manage.examsessions.create', {
        url: '/create',
        templateUrl: 'modules/examsessions/client/views/manager/form-examsession.client.view.html',
        controller: 'ExamSessionsManagerController',
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
        url: '/:examsessionCode',
        templateUrl: 'modules/examsessions/client/views/manager/view-examsession.client.view.html',
        controller: 'ExamSessionsManagerController',
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
        url: '/:examsessionCode/edit',
        templateUrl: 'modules/examsessions/client/views/manager/form-examsession.client.view.html',
        controller: 'ExamSessionsManagerController',
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
      examsessionCode: $stateParams.examsessionCode
    }).$promise;
  }

  newExamSession.$inject = ['ExamSessionsService'];

  function newExamSession(ExamSessionsService) {
    return new ExamSessionsService();
  }
}());
