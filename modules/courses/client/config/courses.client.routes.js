(function() {
  'use strict';

  angular
    .module('courses.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig ($stateProvider) {
    $stateProvider
      .state('courses', {
        abstract: true,
        url: '/courses',
        template: '<ui-view/>'
      })
      .state('courses.list', {
        url: '',
        templateUrl: '/modules/courses/client/views/list-courses.client.view.html',
        controller: 'CoursesListController',
        controllerAs: 'vm',
        data: {
          roles: ['teacher'],
          pageTitle: 'Courses'
        }
      })
      .state('courses.view', {
        url: '/:courseCode',
        templateUrl: '/modules/courses/client/views/view-course.client.view.html',
        controller: 'CoursesController',
        controllerAs: 'vm',
        resolve: {
          courseResolve: getCourse
        },
        data: {
          roles: ['teacher'],
          pageTitle: '{{courseResolve.code}} — {{courseResolve.name}}'
        }
      });
  }

  getCourse.$inject = ['$stateParams', 'CoursesService'];

  function getCourse ($stateParams, CoursesService) {
    return CoursesService.get({
      courseCode: $stateParams.courseCode
    }).$promise;
  }

  newCourse.$inject = ['CoursesService'];

  function newCourse (CoursesService) {
    return new CoursesService();
  }
}());
