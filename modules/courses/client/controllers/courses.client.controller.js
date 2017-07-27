(function() {
  'use strict';

  angular
    .module('courses')
    .controller('CoursesController', CoursesController);

  CoursesController.$inject = ['$scope', '$state', 'courseResolve', '$window', 'Authentication'];

  function CoursesController ($scope, $state, course, $window, Authentication) {
    var vm = this;

    vm.course = course;
    vm.authentication = Authentication;
  }
}());
