(function () {
  'use strict';

  angular
    .module('core')
    .controller('ContentController', ContentController);

  ContentController.$inject = ['$scope', '$state', '$window', '$http', '$location', 'Authentication', 'Notification', '$filter'];

  function ContentController($scope, $state, $window, $http, $location, Authentication, Notification, $filter) {
    var vm = this;

    vm.authentication = Authentication;
    vm.hasAnyRole = hasAnyRole;
    vm.getNumber = getNumber;
    vm.remove = remove;

    // Check if the loggued user has any role from a list
    function hasAnyRole (roles) {
      return vm.authentication.user && roles.some(function(element, index, array) {
        return vm.authentication.user.roles.includes(element);
      });
    }

    // Generate a list of n integers starting from 0
    function getNumber (n) {
      var tab = [];
      for (var i = 0; i < n; i++) {
        tab.push(i);
      }
      return tab;
    }

    // Generic element deletion
    function remove (element, name, id, successroute, key, code) {
      if ($window.confirm($filter('translate')('GENERAL.DELETE_CONFIRMATION', { name: $filter('translate')(name) }))) {
        element.$remove(id, onSuccess, onError);
      }

      function onSuccess(element) {
        $state.go(successroute);

        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')(key, code) });
      }

      function onError(errorResponse) {
        var error = errorResponse.data;

        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + error.message });
      }
    }
  }
}());
