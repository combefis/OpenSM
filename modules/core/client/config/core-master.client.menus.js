(function () {
  'use strict';

  angular
    .module('core.master')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Manage',
      state: 'master.manage',
      type: 'dropdown',
      roles: ['master']
    });
  }

}());
