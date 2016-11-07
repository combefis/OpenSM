(function () {
  'use strict';

  angular
    .module('courses')
    .controller('CoursesController', CoursesController);

  CoursesController.$inject = ['$scope', '$state', '$http', 'courseResolve', '$window', 'Authentication', '$filter'];

  function CoursesController($scope, $state, $http, course, $window, Authentication, $filter) {
    var vm = this;

    vm.course = course;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.loadTeachers = loadTeachers;
    vm.formReady = false;

    var teachersList = [];
    $http.get('/api/teachers').success(function(data, status, headers, config) {
      teachersList = data;
      vm.formReady = true;
    });

    // Save course
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.courseForm');
        return false;
      }

      // Create a new course, or update the current instance
      vm.course.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        // Clear form fields
        vm.course.serial = '';
        vm.course.name = '';
        vm.course.coordinator = {};

        $state.go('admin.manage.courses.view', {
          courseId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Generate list of teachers
    function loadTeachers(query) {
      return $filter('filter')(teachersList, query);
    }
  }
}());
