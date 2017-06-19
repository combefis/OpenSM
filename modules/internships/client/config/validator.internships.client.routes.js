(function () {
  'use strict';

  angular
    .module('internships.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider

      .state('teacher.manage.validator', {
        abstract: true,
        url: '',
        template: '<ui-view/>'
      })

      .state('teacher.manage.validator.internships', {
        abstract: true,
        url: '',
        template: '<ui-view/>'
      })

      .state('teacher.manage.validator.internships.validationlist', {
        url: '/validateInternships',
        templateUrl: 'modules/internships/client/views/list-internships-validator.client.view.html',
        controller: 'InternshipsValidatorListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Internships validation'
        }
      })

      .state('teacher.manage.validator.internships.view', {
        url: '/:internshipId',
        templateUrl: 'modules/internships/client/views/view-internship-validator.client.view.html',
        controller: 'InternshipValidatorController',
        controllerAs: 'vm',
        resolve: {
          internshipResolve: getInternship
        },
        data: {
          pageTitle: 'Manage Internship'
        }
      });
  }

  getInternship.$inject = ['$stateParams', 'InternshipsService'];

  function getInternship($stateParams, InternshipsService) {
    return InternshipsService.get({
      internshipId: $stateParams.internshipId // $stateParams = "prends dans l'url"
    }).$promise;
  }

  newInternship.$inject = ['InternshipsService'];

  function newInternship(InternshipsService) {
    return new InternshipsService();
  }

}());
