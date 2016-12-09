(function () {
  'use strict';

  angular
    .module('courses.admin')
    .controller('CoursesAdminController', CoursesAdminController);

  CoursesAdminController.$inject = ['$scope', '$state', '$http', 'courseResolve', '$window', 'Authentication', '$filter'];

  function CoursesAdminController($scope, $state, $http, course, $window, Authentication, $filter) {
    var vm = this;

    vm.course = course;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.loadTeachers = loadTeachers;
    vm.loadActivities = loadActivities;
    vm.isFormReady = isFormReady;

    // The coordinator must be a list for the tags-input
    if (vm.course.coordinator) {
      vm.course.coordinator = [vm.course.coordinator];
    }

    var tagsInputListsLoaded = [false, false];

    // Load the list of teachers for the tags-input
    var teachersList = [];
    $http.get('/api/teachers').success(function(data, status, headers, config) {
      teachersList = data;
      tagsInputListsLoaded[0] = true;
    });

    // Load the list of activities for the tags-input
    var activitiesList = [];
    $http.get('/api/activities').success(function(data, status, headers, config) {
      activitiesList = data;
      tagsInputListsLoaded[1] = true;
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
        vm.course.code = '';
        vm.course.name = '';
        vm.course.coordinator = [];
        vm.course.description = '';
        vm.course.activities = [];

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

    // Generate list of activities
    function loadActivities(query) {
      return $filter('filter')(activitiesList, query);
    }

    // Test whether the form is ready to be displayed and used
    function isFormReady() {
      return tagsInputListsLoaded.every(function(data) {return data;});
    }
  }
}());
