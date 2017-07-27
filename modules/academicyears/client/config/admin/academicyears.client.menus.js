(function () {
  'use strict';

  angular
    .module('academicyears.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Academic years',
      state: 'admin.manage.academicyears.list',
      roles: ['admin']
    });
  }
}());
