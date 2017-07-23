(function () {
  'use strict';

  angular
    .module('academicyears.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.manage.academicyears', {
        abstract: true,
        url: '/academicyears',
        template: '<ui-view/>'
      })
      .state('admin.manage.academicyears.list', {
        url: '',
        templateUrl: '/modules/academicyears/client/views/admin/list-academicyears.client.view.html',
        controller: 'AcademicYearsListAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Academic Years'
        }
      })
      .state('admin.manage.academicyears.create', {
        url: '/create',
        templateUrl: '/modules/academicyears/client/views/admin/form-academicyear.client.view.html',
        controller: 'AcademicYearsAdminController',
        controllerAs: 'vm',
        resolve: {
          academicyearResolve: newAcademicYear
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create an academic year'
        }
      })
      .state('admin.manage.academicyears.view', {
        url: '/:academicyearCode',
        templateUrl: '/modules/academicyears/client/views/admin/view-academicyear.client.view.html',
        controller: 'AcademicYearsAdminController',
        controllerAs: 'vm',
        resolve: {
          academicyearResolve: getAcademicYear
        },
        data: {
          roles: ['admin'],
          pageTitle: '{{academicyearResolve.code}} – {{academicyearResolve.code+1}}'
        }
      })
      .state('admin.manage.academicyears.edit', {
        url: '/:academicyearCode/edit',
        templateUrl: '/modules/academicyears/client/views/admin/form-academicyear.client.view.html',
        controller: 'AcademicYearsAdminController',
        controllerAs: 'vm',
        resolve: {
          academicyearResolve: getAcademicYear
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit an academic year'
        }
      });
  }

  getAcademicYear.$inject = ['$stateParams', 'AcademicYearsService'];

  function getAcademicYear($stateParams, AcademicYearsService) {
    return AcademicYearsService.get({
      academicyearCode: $stateParams.academicyearCode
    }).$promise;
  }

  newAcademicYear.$inject = ['AcademicYearsService'];

  function newAcademicYear(AcademicYearsService) {
    return new AcademicYearsService();
  }
}());
