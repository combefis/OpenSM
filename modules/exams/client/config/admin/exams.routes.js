(function () {
  'use strict';

  angular
    .module('exams.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.manage.exams', {
        abstract: true,
        url: '/exams',
        template: '<ui-view/>'
      })
      .state('admin.manage.exams.list', {
        url: '',
        templateUrl: 'modules/exams/client/views/admin/list-exams.client.view.html',
        controller: 'ExamsListAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Exams'
        }
      })
      .state('admin.manage.exams.create', {
        url: '/create',
        templateUrl: 'modules/exams/client/views/admin/form-exam.client.view.html',
        controller: 'ExamsAdminController',
        controllerAs: 'vm',
        resolve: {
          examResolve: newExam
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create an exam'
        }
      })
      .state('admin.manage.exams.view', {
        url: '/:examId',
        templateUrl: 'modules/exams/client/views/admin/view-exam.client.view.html',
        controller: 'ViewExamAdminController',
        controllerAs: 'vm',
        resolve: {
          examResolve: getExam
        },
        data: {
          roles: ['admin'],
          pageTitle: '{{examResolve.title}}'
        }
      })
      .state('admin.manage.exams.edit', {
        url: '/:examId/edit',
        templateUrl: 'modules/exams/client/views/admin/form-exam.client.view.html',
        controller: 'ExamsAdminController',
        controllerAs: 'vm',
        resolve: {
          examResolve: getExam
        },
        data: {
          roles: ['admin'],
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
