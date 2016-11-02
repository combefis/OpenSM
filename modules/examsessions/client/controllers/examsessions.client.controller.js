(function () {
  'use strict';

  angular
    .module('examsessions')
    .controller('ExamSessionsController', ExamSessionsController);

  ExamSessionsController.$inject = ['$scope', '$state', 'examsessionResolve', '$window', 'Authentication'];

  function ExamSessionsController($scope, $state, examsession, $window, Authentication) {
    var vm = this;

    vm.examsession = examsession;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;

    // Convert start and end dates to Date objects
    vm.examsession.start = vm.examsession.start ? new Date(vm.examsession.start) : null;
    vm.examsession.end = vm.examsession.end ? new Date(vm.examsession.end) : null;

    // Save exam session
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.examsessionForm');
        return false;
      }

      // Create a new exam session, or update the current instance
      vm.examsession.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.manage.examsessions.view', {
          examsessionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
