(function () {
  'use strict';

  angular
    .module('examsessions.admin')
    .controller('ExamSessionsListController', ExamSessionsListController);

  ExamSessionsListController.$inject = ['ExamSessionsService'];

  function ExamSessionsListController(ExamSessionsService) {
    var vm = this;

    vm.examsessions = ExamSessionsService.query();
  }
}());
