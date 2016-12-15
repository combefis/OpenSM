(function () {
  'use strict';

  angular
    .module('examsessions.admin')
    .controller('ExamSessionsListAdminController', ExamSessionsListAdminController);

  ExamSessionsListAdminController.$inject = ['ExamSessionsService'];

  function ExamSessionsListAdminController(ExamSessionsService) {
    var vm = this;

    vm.examsessions = ExamSessionsService.query();
  }
}());
