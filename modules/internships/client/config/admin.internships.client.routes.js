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
      templateUrl: 'modules/internships/client/views/createInternship.client.view.html',
      controller: 'InternshipsController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Create a new internship'
      },
      resolve: {
        internshipResolve: newInternship
      }
    })
    
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
