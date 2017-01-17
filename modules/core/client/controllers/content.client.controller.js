(function () {
  'use strict';

  angular
    .module('core')
    .controller('ContentController', ContentController);

  ContentController.$inject = ['$scope', '$state', '$http', '$location', 'Authentication'];

  function ContentController($scope, $state, $http, $location, Authentication) {
    var vm = this;

    vm.authentication = Authentication;
    vm.hasAnyRole = hasAnyRole;
    vm.getNumber = getNumber;

    function hasAnyRole (roles) {
      return roles.some(function(element, index, array) {
        return vm.authentication.user.roles.includes(element);
      });
    }

    function getNumber (n) {
      var tab = [];
      for (var i = 0; i < n; i++) {
        tab.push(i);
      }
      return tab;
    }
  }
}());
