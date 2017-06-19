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

    menuService.addSubMenuItem('topbar', 'master.manage', {
      title: 'Students',
      state: 'master.manage.students.list',
      roles: ['master']
    });

    menuService.addSubMenuItem('topbar', 'manager.manage', {
      title: 'Internships',
      state: 'manager.manage.internships.list',
      roles: ['manager.internships']
    });

    menuService.addSubMenuItem('topbar', 'teacher.manage', {
      title: 'Internships',
      state: 'teacher.manage.validator.internships.validationlist',
      roles: ['validator']
    });

    menuService.addSubMenuItem('topbar', 'teacher.manage', {
      title: 'Internships',
      state: 'teacher.manage.coordinator.internships.list',
      roles: ['coordinator']
    });

    menuService.addSubMenuItem('topbar', 'teacher.manage', {
      title: 'My Internships',
      state: 'teacher.manage.internships.list',
      roles: ['teacher']
    });

    menuService.addSubMenuItem('topbar', 'coordinator.manage', {
      title: 'Internships',
      state: 'coordinator.manage.internships.list',
      roles: ['coordinator']
    });


  }
}());
