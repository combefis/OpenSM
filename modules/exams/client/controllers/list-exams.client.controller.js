(function () {
  'use strict';

  angular
    .module('exams')
    .controller('ExamsListController', ExamsListController);

  ExamsListController.$inject = ['ExamsService'];

  function ExamsListController(ExamsService) {
    var vm = this;

    vm.exams = ExamsService.query();
  }
}());
