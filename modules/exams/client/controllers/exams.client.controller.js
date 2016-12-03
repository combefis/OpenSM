(function () {
  'use strict';

  angular
    .module('exams')
    .controller('ExamsController', ExamsController);

  ExamsController.$inject = ['$scope', '$state', '$http', 'examResolve', '$window', 'Authentication', '$filter', '$stateParams'];

  function ExamsController($scope, $state, $http, exam, $window, Authentication, $filter, $stateParams) {
    var vm = this;

    vm.exam = exam;
    vm.examsession = null;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.loadCourses = loadCourses;
    vm.isFormReady = isFormReady;

    // The course and exam session must be a list for the tags-input
    if (vm.exam.course) {
      vm.exam.course = [vm.exam.course];
    }

    var tagsInputListsLoaded = [false];

    // Load the list of courses for the tags-input
    var coursesList = [];
    $http.get('/api/courses').success(function(data, status, headers, config) {
      coursesList = data;
      tagsInputListsLoaded[0] = true;
    });

    // Load the exam session
    $http.get('/api/examsessions/' + $stateParams.examsessionId).success(function(data, status, headers, config) {
      vm.examsession = data;
    });

    // Convert date to Date object
    vm.exam.date = vm.exam.date ? new Date(vm.exam.date) : null;

    // Save exam
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.examForm');
        return false;
      }

      // Create a new exam, or update the current instance
      vm.exam.examsession = [vm.examsession];
      vm.exam.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        // Clear form fields
        vm.exam.title = '';
        vm.exam.course = [];
        vm.exam.examsession = null;
        vm.exam.date = null;
        vm.exam.duration = 0;

        $state.go('admin.manage.exams.view', {
          examId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Generate list of courses
    function loadCourses(query) {
      return $filter('filter')(coursesList, query);
    }

    // Test whether the form is ready to be displayed and used
    function isFormReady() {
      return tagsInputListsLoaded.every(function(data) {return data;}) && vm.examsession !== null;
    }
  }
}());
