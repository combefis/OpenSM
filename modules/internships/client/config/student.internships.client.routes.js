(function () {
  'use strict';

  angular
    .module('internships.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('student.manage.internships', {
        abstract: true,
        url: '/internships',
        template: '<ui-view/>'
      })

      .state('student.manage.internships.list', {
        url: '',
        templateUrl: 'modules/internships/client/views/list-studentInternships.client.view.html',
        controller: 'MyInternshipsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'List of internships'
        }
      })

    .state('student.manage.internships.create', {
      url: '/create',
      templateUrl: 'modules/internships/client/views/createInternship.client.view.html',
      controller: 'MyInternshipController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Create internship'
      },
      resolve: {
        internshipResolve: newInternship
      }
    })
    .state('student.manage.internships.edit', {
      url: '/edit',
      templateUrl: 'modules/internships/client/views/createInternship.client.view.html',
      controller: 'MyInternshipController',
      controllerAs: 'vm',
      resolve: {
        internshipResolve: getInternship
      },
      data: {
        pageTitle: 'Edit internship'
      }
    });
  }

  getInternship.$inject = ['$stateParams', 'InternshipsService'];

  function getInternship($stateParams, InternshipsService) {
    return InternshipsService.get({
      internshipCode: $stateParams.internshipCode
    }).$promise;
  }

  newInternship.$inject = ['InternshipsService'];

  function newInternship(InternshipsService) {
    return new InternshipsService();
  }

}());
