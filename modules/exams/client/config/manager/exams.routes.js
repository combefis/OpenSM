(function() {
  'use strict';

  angular
    .module('exams.manager.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('manage.examsessions.addexam', {
        url: '/:examsessionCode/addexam',
        templateUrl: '/modules/exams/client/views/manager/form-exam.client.view.html',
        controller: 'ExamsManagerController',
        controllerAs: 'vm',
        resolve: {
          examResolve: newExam
        },
        data: {
          roles: ['manager.exams'],
          pageTitle: 'Create an exam'
        }
      })
      .state('manage.examsessions.viewexam', {
        url: '/:examsessionCode/exams/:examId',
        templateUrl: '/modules/exams/client/views/manager/view-exam.client.view.html',
        controller: 'ViewExamManagerController',
        controllerAs: 'vm',
        resolve: {
          examResolve: getExam
        },
        data: {
          roles: ['manager.exams'],
          pageTitle: '{{examResolve.title}}'
        }
      })
      .state('manage.examsessions.editexam', {
        url: '/:examsessionCode/exams/:examId/edit',
        templateUrl: '/modules/exams/client/views/manager/form-exam.client.view.html',
        controller: 'ExamsManagerController',
        controllerAs: 'vm',
        resolve: {
          examResolve: getExam
        },
        data: {
          roles: ['manager.exams'],
          pageTitle: 'Edit an exam'
        }
      });
  }

  getExam.$inject = ['$stateParams', 'ExamsService'];

  function getExam($stateParams, ExamsService) {
    return ExamsService.get({
      examId: $stateParams.examId
    }).$promise;
  }

  newExam.$inject = ['ExamsService'];

  function newExam(ExamsService) {
    return new ExamsService();
  }
}());
