(function () {
  'use strict';

  angular
    .module('academicyears.admin')
    .controller('AcademicYearsAdminController', AcademicYearsAdminController);

  AcademicYearsAdminController.$inject = ['$scope', '$state', 'academicyearResolve', '$window', 'Authentication', 'Notification', '$filter'];

  function AcademicYearsAdminController($scope, $state, academicyear, $window, Authentication, Notification, $filter) {
    var vm = this;

    vm.academicyear = academicyear;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Convert start and end dates to Date objects
    vm.academicyear.start = vm.academicyear.start ? new Date(vm.academicyear.start) : null;
    vm.academicyear.end = vm.academicyear.end ? new Date(vm.academicyear.end) : null;

    // Remove existing academic year
    function remove() {
      if ($window.confirm('Are you sure you want to delete this academic year?')) {
        vm.academicyear.$remove({ academicyearCode: academicyear.code }, onSuccess, onError);
      }

      function onSuccess(academicyear) {
        $state.go('admin.manage.academicyears.list');
        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('ACADEMICYEAR.SUCCESSFUL_DELETE') });
      }

      function onError(errorResponse) {
        var error = errorResponse.data;
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + error.message });
      }
    }

    // Save academic year
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.academicyearForm');
        return false;
      }

      // Create a new academic year, or update the current instance
      vm.academicyear.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        var code = vm.academicyear.code;
        // Clear form fields
        vm.academicyear.code = '';
        vm.academicyear.start = null;
        vm.academicyear.end = null;

        $state.go('admin.manage.academicyears.view', {
          academicyearCode: code
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
