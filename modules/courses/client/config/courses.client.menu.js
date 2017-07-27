(function() {
  'use strict';

  angular
    .module('courses')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig (menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'dashboard', {
      title: 'Courses',
      state: 'courses.list',
      roles: ['teacher']
    });
  }
}());
