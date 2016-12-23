(function () {
  'use strict';

  angular
    .module('evalgrids.admin')
    .controller('EvalGridsAdminController', EvalGridsAdminController);

  EvalGridsAdminController.$inject = ['$scope', '$state', 'evalgridResolve', 'Authentication'];

  function EvalGridsAdminController($scope, $state, evalgrid, Authentication) {
    var vm = this;

    vm.evalgrid = evalgrid;
    vm.authentication = Authentication;
  }
}());
