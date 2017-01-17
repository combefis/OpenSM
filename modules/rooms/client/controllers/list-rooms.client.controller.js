(function () {
  'use strict';

  angular
    .module('rooms')
    .controller('RoomsListController', RoomsListController);

  RoomsListController.$inject = ['RoomsService'];

  function RoomsListController(RoomsService) {
    var vm = this;

    vm.rooms = RoomsService.query();
  }
}());
