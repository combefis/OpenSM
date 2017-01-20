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

    menuService.addSubMenuItem('topbar', 'student.manage', {
      title: 'Internships',
      state: 'student.manage.internships.list',
      roles: ['student']
    });

  }
}());
