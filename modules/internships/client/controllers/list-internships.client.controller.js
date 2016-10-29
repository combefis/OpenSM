(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsListController', InternshipsListController);

  InternshipsListController.$inject = ['InternshipsService'];

  function InternshipsListController(InternshipsService) {
    var vm = this;

    vm.internships = InternshipsService.query();
  }
}());
