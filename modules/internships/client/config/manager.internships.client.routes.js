(function () {
  'use strict';

  angular
    .module('internships.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('manager.manage.internships', {
        abstract: true,
        url: '/internships',
        template: '<ui-view/>'
      })

      .state('manager.manage.internships.list', {
        url: '',
        templateUrl: 'modules/internships/client/views/table-internships-manager.client.view.html',
        controller: 'InternshipsManagerTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Internships management'
        }
      })

      .state('manager.manage.internships.view', {
        url: '/:internshipId',
        templateUrl: 'modules/internships/client/views/view-internship-manager.client.view.html',
        controller: 'InternshipsController',
        controllerAs: 'vm',
        resolve: {
          internshipResolve: getInternship
        },
        data: {
          pageTitle: 'Supervisor demand'
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
