(function () {
  'use strict';

  angular
    .module('examsessions.manager')
    .controller('ExamSessionsListManagerController', ExamSessionsListManagerController);

  ExamSessionsListManagerController.$inject = ['ExamSessionsService'];

  function ExamSessionsListManagerController(ExamSessionsService) {
    var vm = this;

    vm.examsessions = ExamSessionsService.query();
  }
}());
