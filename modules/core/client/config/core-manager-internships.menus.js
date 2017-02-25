(function () {
  'use strict';

  angular
    .module('core.manager.internships')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Manage',
      state: 'manager.manage',
      type: 'dropdown',
      roles: ['manager.internships']
    });
  }

}());
