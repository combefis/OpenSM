(function () {
  'use strict';

  angular
    .module('evalgrids.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Evaluation grids',
      state: 'admin.manage.evalgrids.list',
      roles: ['admin']
    });
  }
}());
