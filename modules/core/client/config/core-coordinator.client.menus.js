(function () {
  'use strict';

  angular
    .module('core.coordinator')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Manage',
      state: 'coordinator.manage',
      type: 'dropdown',
      roles: ['coordinator']
    });
  }

}());
