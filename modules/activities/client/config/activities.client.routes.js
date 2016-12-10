(function () {
  'use strict';

  angular
    .module('activities.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.manage.activities', {
        abstract: true,
        url: '/activities',
        template: '<ui-view/>'
      })
      .state('admin.manage.activities.list', {
        url: '',
        templateUrl: 'modules/activities/client/views/list-activities.client.view.html',
        controller: 'ActivitiesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Activities'
        }
      })
      .state('admin.manage.activities.create', {
        url: '/create',
        templateUrl: 'modules/activities/client/views/form-activity.client.view.html',
        controller: 'ActivitiesController',
        controllerAs: 'vm',
        resolve: {
          activityResolve: newActivity
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create an activity'
        }
      })
      .state('admin.manage.activities.view', {
        url: '/:activityCode',
        templateUrl: 'modules/activities/client/views/view-activity.client.view.html',
        controller: 'ActivitiesController',
        controllerAs: 'vm',
        resolve: {
          activityResolve: getActivity
        },
        data: {
          roles: ['admin'],
          pageTitle: '{{activityResolve.code}} — {{activityResolve.name}}'
        }
      })
      .state('admin.manage.activities.edit', {
        url: '/:activityCode/edit',
        templateUrl: 'modules/activities/client/views/form-activity.client.view.html',
        controller: 'ActivitiesController',
        controllerAs: 'vm',
        resolve: {
          activityResolve: getActivity
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit an activity'
        }
      });
  }

  getActivity.$inject = ['$stateParams', 'ActivitiesService'];

  function getActivity($stateParams, ActivitiesService) {
    return ActivitiesService.get({
      activityCode: $stateParams.activityCode
    }).$promise;
  }

  newActivity.$inject = ['ActivitiesService'];

  function newActivity(ActivitiesService) {
    return new ActivitiesService();
  }
}());
