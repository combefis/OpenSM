(function () {
  'use strict';

  angular
    .module('activities')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Activities',
      state: 'admin.manage.activities.list',
      roles: ['admin']
    });
  }
}());
