(function() {
  'use strict';

  angular
    .module('companies.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig ($stateProvider) {
    $stateProvider
      .state('admin.manage.companies', {
        abstract: true,
        url: '/companies',
        template: '<ui-view/>'
      })
      .state('admin.manage.companies.list', {
        url: '',
        templateUrl: '/modules/companies/client/views/admin/list-companies.client.view.html',
        controller: 'CompaniesListAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Companies'
        }
      })
      .state('admin.manage.companies.create', {
        url: '/create',
        templateUrl: '/modules/companies/client/views/admin/form-company.client.view.html',
        controller: 'CompaniesAdminController',
        controllerAs: 'vm',
        resolve: {
          companyResolve: newCompany
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create a company'
        }
      })
      .state('admin.manage.companies.view', {
        url: '/:companyId',
        templateUrl: '/modules/companies/client/views/admin/view-company.client.view.html',
        controller: 'CompaniesAdminController',
        controllerAs: 'vm',
        resolve: {
          companyResolve: getCompany
        },
        data: {
          roles: ['admin'],
          pageTitle: '{{companyResolve.code}} — {{companyResolve.name}}'
        }
      })
      .state('admin.manage.companies.edit', {
        url: '/:companyId/edit',
        templateUrl: '/modules/companies/client/views/admin/form-company.client.view.html',
        controller: 'CompaniesAdminController',
        controllerAs: 'vm',
        resolve: {
          companyResolve: getCompany
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit a company'
        }
      });
  }

  getCompany.$inject = ['$stateParams', 'CompaniesService'];

  function getCompany ($stateParams, CompaniesService) {
    return CompaniesService.get({
      companyId: $stateParams.companyId
    }).$promise;
  }

  newCompany.$inject = ['CompaniesService'];

  function newCompany (CompaniesService) {
    return new CompaniesService();
  }
}());
