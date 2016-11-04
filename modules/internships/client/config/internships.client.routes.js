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
          pageTitle: 'Internships'
        }
      });
  }
}());
