(function() {
  'use strict';

  angular
    .module('exams.admin')
    .controller('ExamsAdminController', ExamsAdminController);

  ExamsAdminController.$inject = ['$scope', '$state', '$http', 'examResolve', '$window', 'Authentication', 'Notification', '$filter'];

  function ExamsAdminController($scope, $state, $http, exam, $window, Authentication, Notification, $filter) {
    var vm = this;

    vm.exam = exam;
    vm.examtitle = exam.title;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;

    // Auto-completion for tags-input
    vm.loadCourses = loadCourses;
    vm.loadExamSessions = loadExamSessions;
    vm.isFormReady = isFormReady;

    var examId = exam._id;

    // The course and exam session must be a list for the tags-input
    if (vm.exam.course) {
      vm.exam.course = [vm.exam.course];
    }
    if (vm.exam.examsession) {
      vm.exam.examsession = [vm.exam.examsession];
    }

    var tagsInputListsLoaded = [false, false];

    // Load the list of courses for the tags-input
    var coursesList = [];
    $http.get('/api/courses').success(function(data, status, headers, config) {
      coursesList = data;
      tagsInputListsLoaded[0] = true;
    });

    // Load the list of exam sessions for the tags-input
    var examsessionsList = [];
    $http.get('/api/examsessions').success(function(data, status, headers, config) {
      examsessionsList = data;
      tagsInputListsLoaded[1] = true;
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
      vm.exam.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        var title = vm.exam.title;
        // Clear form fields
        vm.exam.title = '';
        vm.exam.course = [];
        vm.exam.examsession = [];
        vm.exam.date = null;
        vm.exam.duration = 0;

        if (examId) {
          $state.go('admin.manage.exams.view', {
            examId: res._id
          });
        } else {
          $state.go('admin.manage.exams.list');
        }
        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')(examId ? 'EXAM.SUCCESSFUL_UPDATE' : 'EXAM.SUCCESSFUL_CREATION', { title: title }) });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Generate list of courses
    function loadCourses(query) {
      return $filter('filter')(coursesList, query);
    }

    // Generate list of exam sessions
    function loadExamSessions(query) {
      return $filter('filter')(examsessionsList, query);
    }

    // Test whether the form is ready to be displayed and used
    function isFormReady() {
      return tagsInputListsLoaded.every(function(data) {return data;});
    }
  }
}());
