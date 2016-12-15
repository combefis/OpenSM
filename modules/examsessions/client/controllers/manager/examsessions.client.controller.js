(function () {
  'use strict';

  angular
    .module('examsessions.manager')
    .controller('ExamSessionsManagerController', ExamSessionsManagerController);

  ExamSessionsManagerController.$inject = ['$scope', '$state', 'examsessionResolve', '$window', 'Authentication', 'Notification', '$filter'];

  function ExamSessionsManagerController($scope, $state, examsession, $window, Authentication, Notification, $filter) {
    var vm = this;

    vm.examsession = examsession;
    vm.examsessionname = examsession.name;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Convert start and end dates to Date objects
    vm.examsession.start = vm.examsession.start ? new Date(vm.examsession.start) : null;
    vm.examsession.end = vm.examsession.end ? new Date(vm.examsession.end) : null;

    // Remove existing exam session
    function remove() {
      if ($window.confirm('Are you sure you want to delete this exam session?')) {
        vm.examsession.$remove({ examsessionCode: examsession.code }, onSuccess, onError);
      }

      function onSuccess(examsession) {
        $state.go('manage.examsessions.list');
        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAMSESSION.SUCCESSFUL_DELETE') });
      }

      function onError(errorResponse) {
        var error = errorResponse.data;
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + error.message });
      }
    }

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
        var code = vm.examsession.code;
        // Clear form fields
        vm.examsession.code = '';
        vm.examsession.name = '';
        vm.examsession.description = '';
        vm.examsession.start = null;
        vm.examsession.end = null;

        $state.go('manage.examsessions.view', {
          examsessionCode: code
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
