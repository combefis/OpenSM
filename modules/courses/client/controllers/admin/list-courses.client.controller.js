(function () {
  'use strict';

  angular
    .module('courses.admin')
    .controller('CoursesListAdminController', CoursesListAdminController);

  CoursesListAdminController.$inject = ['CoursesService'];

  function CoursesListAdminController(CoursesService) {
    var vm = this;

    vm.courses = CoursesService.query({ filter: 'all' });
  }
}());
