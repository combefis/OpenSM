(function () {
  'use strict';

  angular
    .module('courses.services')
    .factory('CoursesService', CoursesService);

  CoursesService.$inject = ['$resource'];

  function CoursesService($resource) {
    var Course = $resource('api/courses');

    return Course;
  }
}());
