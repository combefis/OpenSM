(function () {
  'use strict';

  angular
    .module('exams')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Exams',
      state: 'admin.manage.exams.list',
      roles: ['admin']
    });
  }
}());
