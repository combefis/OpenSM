(function() {
  'use strict';

  angular
    .module('companies.admin')
    .controller('CompaniesAdminController', CompaniesAdminController);

  CompaniesAdminController.$inject = ['$scope', '$state', '$http', 'companyResolve', 'Authentication', 'Notification', '$filter'];

  function CompaniesAdminController ($scope, $state, $http, company, Authentication, Notification, $filter) {
    var vm = this;

    vm.company = company;
    vm.companyname = company.name;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;

    var companyId = company._id;

    // Save company
    function save (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.companyForm');
        return false;
      }

      // Create a new company, or update the current instance
      vm.company.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback (res) {
        var name = vm.company.name;

        // Clear form fields
        vm.company.code = '';
        vm.company.address.street = '';
        vm.company.address.number = '';
        vm.company.address.zipcode = '';
        vm.company.address.city = '';
        vm.company.address.country = '';

        if (companyId) {
          $state.go('admin.manage.companies.view', { companyId: company._id });
          Notification.success({
            title: '<i class="glyphicon glyphicon-exclamation-pencil"></i> ' + $filter('translate')('COMPANY.UPDATE'),
            message: $filter('translate')('COMPANY.SUCCESSFUL_UPDATE', { name: name })
          });
        } else {
          $state.go('admin.manage.companies.list');
          Notification.success({
            title: '<i class="glyphicon glyphicon-exclamation-add"></i> ' + $filter('translate')('COMPANY.CREATION'),
            message: $filter('translate')('COMPANY.SUCCESSFUL_CREATION', { name: name })
          });
        }
      }

      function errorCallback (res) {
        Notification.error({
          title: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('GENERAL.ERROR'),
          message: res.data.message
        });
      }
    }
  }
}());
