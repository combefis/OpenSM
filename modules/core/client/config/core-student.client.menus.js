(function () {
  'use strict';

  angular
    .module('core.student')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Manage',
      state: 'student.manage',
      type: 'dropdown',
      roles: ['student']
    });
  }

}());
