(function () {
  'use strict';

  angular
    .module('courses.admin.routes')
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
        templateUrl: 'modules/courses/client/views/admin/list-courses.client.view.html',
        controller: 'CoursesListAdminController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Courses'
        }
      })
      .state('admin.manage.courses.create', {
        url: '/create',
        templateUrl: 'modules/courses/client/views/admin/form-course.client.view.html',
        controller: 'CoursesAdminController',
        controllerAs: 'vm',
        resolve: {
          courseResolve: newCourse
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create a course'
        }
      })
      .state('admin.manage.courses.view', {
        url: '/:courseId',
        templateUrl: 'modules/courses/client/views/admin/view-course.client.view.html',
        controller: 'CoursesAdminController',
        controllerAs: 'vm',
        resolve: {
          courseResolve: getCourse
        },
        data: {
          pageTitle: '{{courseResolve.code}} — {{courseResolve.name}}'
        }
      })
      .state('admin.manage.courses.edit', {
        url: '/:courseId/edit',
        templateUrl: 'modules/courses/client/views/admin/form-course.client.view.html',
        controller: 'CoursesAdminController',
        controllerAs: 'vm',
        resolve: {
          courseResolve: getCourse
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit a course'
        }
      });
  }

  getCourse.$inject = ['$stateParams', 'CoursesService'];

  function getCourse($stateParams, CoursesService) {
    return CoursesService.get({
      courseId: $stateParams.courseId
    }).$promise;
  }

  newCourse.$inject = ['CoursesService'];

  function newCourse(CoursesService) {
    return new CoursesService();
  }
}());
