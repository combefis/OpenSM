(function () {
  'use strict';

  angular
    .module('rooms.admin')
    .controller('RoomsListController', RoomsListController);

  RoomsListController.$inject = ['RoomsService'];

  function RoomsListController(RoomsService) {
    var vm = this;

    vm.rooms = RoomsService.query();
  }
}());
