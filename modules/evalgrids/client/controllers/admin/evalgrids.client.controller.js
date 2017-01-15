(function () {
  'use strict';

  angular
    .module('evalgrids.admin')
    .controller('EvalGridsAdminController', EvalGridsAdminController);

  EvalGridsAdminController.$inject = ['$scope', '$state', '$window', 'evalgridResolve', 'Authentication', '$filter', 'Notification'];

  function EvalGridsAdminController($scope, $state, $window, evalgrid, Authentication, $filter, Notification) {
    var vm = this;

    vm.evalgrid = evalgrid;
    vm.name = evalgrid.name;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.addCategory = addCategory;
    vm.addCriterion = addCriterion;

    // Save evaluation grid
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.evalgridForm');
        return false;
      }

      // Create a new evaluation grid, or update the current instance
      vm.evalgrid.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        var code = vm.evalgrid.code;
        // Clear form fields
        vm.evalgrid.code = '';
        vm.evalgrid.name = '';
        vm.evalgrid.description = '';
        vm.evalgrid.categories = [];

        $state.go('admin.manage.evalgrids.view', {
          evalgridCode: code
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function addCategory() {
      if (!vm.evalgrid.categories) {
        vm.evalgrid.categories = [];
      }
      vm.evalgrid.categories.push({});
    }

    function addCriterion(i) {
      if (!vm.evalgrid.categories[i].criteria) {
        vm.evalgrid.categories[i].criteria = [];
      }
      vm.evalgrid.categories[i].criteria.push({});
    }
  }
}());
