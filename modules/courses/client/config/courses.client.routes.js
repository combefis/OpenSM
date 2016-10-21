(function () {
  'use strict';

  angular
    .module('courses.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.manage.courses', {
        abstract: true,
        url: '/courses',
        template: '<ui-view/>'
      })
      .state('admin.manage.courses.list', {
        url: '',
        templateUrl: 'modules/courses/client/views/list-courses.client.view.html',
        controller: 'CoursesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Courses list'
        }
      });
  }
}());
