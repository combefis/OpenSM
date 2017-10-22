(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', '$http', 'Authentication', 'menuService'];

  function HeaderController($scope, $state, $http, Authentication, menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    // Load current academic year
    vm.academicyear = null;
    if (vm.authentication.user) {
      $http.get('/api/academicyears/current').success(function(data, status, headers, config) {
        vm.academicyear = data;
      });
    }

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
