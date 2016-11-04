(function () {
  'use strict';

  angular
    .module('internships')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Internships',
      state: 'admin.manage.internships.list',
      roles: ['admin']
    });

    menuService.addSubMenuItem('topbar', 'dashboard', {
      title: 'My internships',
      state: 'internships',
      roles: ['student']
    });
  }
}());
