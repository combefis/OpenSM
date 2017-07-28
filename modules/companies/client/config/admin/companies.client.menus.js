(function() {
  'use strict';

  angular
    .module('companies.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig (menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Companies',
      state: 'admin.manage.companies.list',
      roles: ['admin']
    });
  }
}());
