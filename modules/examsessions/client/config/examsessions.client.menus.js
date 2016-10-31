(function () {
  'use strict';

  angular
    .module('examsessions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.manage', {
      title: 'Exam sessions',
      state: 'admin.manage.examsessions.list',
      roles: ['admin']
    });
  }
}());
