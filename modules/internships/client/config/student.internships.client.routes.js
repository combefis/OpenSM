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
      templateUrl: 'modules/internships/client/views/list-internships-student.client.view.html',
      controller: 'InternshipsListController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'My Internships'
      },
      resolve: {
        internshipResolve: newInternship
      }
    })

    .state('student.manage.internships.view', {
      url: '/:internshipId',
      templateUrl: 'modules/internships/client/views/view-internship-student.client.view.html',
      controller: 'InternshipsController',
      controllerAs: 'vm',
      resolve: {
        internshipResolve: getInternship
      },
      data: {
        pageTitle: 'View internship details'
      }
    })

    ;
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
