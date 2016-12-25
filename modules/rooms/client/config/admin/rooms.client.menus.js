(function () {
  'use strict';

  angular
    .module('rooms.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Rooms',
      state: 'admin.manage.rooms.list',
      roles: ['admin']
    });
  }
}());
