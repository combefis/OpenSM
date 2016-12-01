(function () {
  'use strict';

  angular
    .module('examsessions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'manage', {
      title: 'Exam sessions',
      state: 'manage.examsessions.list',
      roles: ['manager.exams']
    });
  }
}());
