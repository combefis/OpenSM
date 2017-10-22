(function() {
  'use strict';

  angular
    .module('rooms.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Rooms',
      state: 'admin.manage.rooms.list',
      roles: ['admin']
    });
  }
}());
