(function () {
  'use strict';

  angular
    .module('academicyears.admin')
    .controller('AcademicYearsListAdminController', AcademicYearsListAdminController);

  AcademicYearsListAdminController.$inject = ['AcademicYearsService'];

  function AcademicYearsListAdminController(AcademicYearsService) {
    var vm = this;

    vm.academicyears = AcademicYearsService.query();
  }
}());
