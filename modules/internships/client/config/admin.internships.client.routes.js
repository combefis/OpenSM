(function () {
  'use strict';

  angular
    .module('internships.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.manage.internships', {
        abstract: true,
        url: '/internships',
        template: '<ui-view/>'
      })

      .state('admin.manage.internships.list', {
        url: '',
        templateUrl: 'modules/internships/client/views/list-internships.client.view.html',
        controller: 'InternshipsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Internships management'
        }
      })

    .state('admin.manage.internships.create', {
      url: '/create',
      templateUrl: 'modules/internships/client/views/form-internship.client.view.html',
      controller: 'InternshipsController',
      controllerAs: 'vm',
      resolve: {
        internshipResolve: newInternship
      },
      data: {
        pageTitle: 'Create a new internship'
      }
    })

    .state('admin.manage.internships.view', {
      url: '/:internshipId',
      templateUrl: 'modules/internships/client/views/view-internship.client.view.html',
      controller: 'InternshipsController',
      controllerAs: 'vm',
      resolve: {
        internshipResolve: getInternship
      },
      data: {
        pageTitle: 'view internship details'
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
