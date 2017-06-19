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
        },
        resolve: {
          deadlinesResolve: newDeadlinesCollection
        }
      })

      .state('manager.manage.internships.deadlines', {
        url: '/:deadlinesId',
        templateUrl: 'modules/internships/client/views/form-deadlines-manager.client.view.html',
        controller: 'InternshipsManagerDeadlinesController',
        controllerAs: 'vm',
        resolve: {
          deadlinesResolve: getDeadlines
        },
        data: {
          pageTitle: 'Manage Deadlines'
        }
      })

      .state('manager.manage.internships.view', {
        url: '/:internshipId',
        templateUrl: 'modules/internships/client/views/view-internship-manager.client.view.html',
        controller: 'InternshipsManagerController',
        controllerAs: 'vm',
        resolve: {
          internshipResolve: getInternship
        },
        data: {
          pageTitle: 'Manage Internship'
        }
      })

      .state('manager.manage.internships.edit', {
        url: '/:internshipId/edit',
        template: '<ui-view/>'
      })

      .state('manager.manage.internships.edit.enterprise', {
        url: '/:internshipId/edit/enterprise',
        templateUrl: 'modules/internships/client/views/form-internship-manager-enterprise.client.view.html',
        controller: 'InternshipsManagerController',
        controllerAs: 'vm',
        resolve: {
          internshipResolve: getInternship
        },
        data: {
          pageTitle: 'Edit Enterprise'
        }
      })

      ;
  }

  getInternship.$inject = ['$stateParams', 'InternshipsService'];
  getDeadlines.$inject = ['$stateParams', 'DeadlinesService'];

  function getInternship($stateParams, InternshipsService) {
    return InternshipsService.get({
      internshipId: $stateParams.internshipId // $stateParams = "prends dans l'url"
    }).$promise;
  }

  function getDeadlines($stateParams, DeadlinesService) {
    return DeadlinesService.get({
      deadlinesId: $stateParams.deadlinesId // $stateParams = "prends dans l'url"
    }).$promise;
  }

  newDeadlinesCollection.$inject = ['DeadlinesService'];

  function newDeadlinesCollection(DeadlinesService) {
    return new DeadlinesService();
  }

}());
