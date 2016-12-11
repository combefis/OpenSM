(function () {
  'use strict';

  angular
    .module('examsessions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'dashboard', {
      title: 'Exam sessions',
      state: 'examsessions.list',
      roles: ['teacher']
    });
  }
}());
