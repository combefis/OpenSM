(function () {
  'use strict';

  angular
    .module('evalgrids.admin')
    .controller('EvalGridsListAdminController', EvalGridsListAdminController);

  EvalGridsListAdminController.$inject = ['EvalGridsService'];

  function EvalGridsListAdminController(EvalGridsService) {
    var vm = this;

    vm.evalgrids = EvalGridsService.query();
  }
}());
