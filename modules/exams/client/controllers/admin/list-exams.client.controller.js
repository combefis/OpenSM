(function () {
  'use strict';

  angular
    .module('exams.admin')
    .controller('ExamsListAdminController', ExamsListAdminController);

  ExamsListAdminController.$inject = ['ExamsService'];

  function ExamsListAdminController(ExamsService) {
    var vm = this;

    vm.exams = ExamsService.query();
  }
}());
