(function () {
  'use strict';

  angular
    .module('examsessions.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('examsessions', {
        abstract: true,
        url: '/examsessions',
        template: '<ui-view/>'
      })
      .state('examsessions.list', {
        url: '',
        templateUrl: 'modules/examsessions/client/views/list-examsessions.client.view.html',
        controller: 'ExamSessionsListController',
        controllerAs: 'vm',
        data: {
          roles: ['teacher'],
          pageTitle: 'Exam sessions'
        }
      })
      .state('examsessions.view', {
        url: '/:examsessionCode',
        templateUrl: 'modules/examsessions/client/views/view-examsession.client.view.html',
        controller: 'ExamSessionsController',
        controllerAs: 'vm',
        resolve: {
          examsessionResolve: getExamSession
        },
        data: {
          roles: ['teacher'],
          pageTitle: '{{examsessionResolve.name}}'
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
