(function () {
  'use strict';

  angular
    .module('exams.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('examsessions.viewexam', {
        url: '/:examsessionCode/exams/:examId',
        templateUrl: 'modules/exams/client/views/view-exam.client.view.html',
        controller: 'ViewExamController',
        controllerAs: 'vm',
        resolve: {
          examResolve: getExam
        },
        data: {
          roles: ['teacher', 'printer'],
          pageTitle: '{{examResolve.title}}'
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
