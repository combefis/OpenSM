(function () {
  'use strict';

  angular
    .module('exams.manager')
    .controller('ExamsManagerController', ExamsManagerController);

  ExamsManagerController.$inject = ['$scope', '$state', '$http', 'examResolve', '$window', 'Authentication', '$stateParams', 'Notification', '$filter'];

  function ExamsManagerController($scope, $state, $http, exam, $window, Authentication, $stateParams, Notification, $filter) {
    var vm = this;

    vm.exam = exam;
    vm.examtitle = exam.title;
    vm.examsession = null;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;

    // Auto-completion for tags-input
    vm.loadCourses = loadCourses;
    vm.isFormReady = isFormReady;

    var examId = exam._id;

    // The course must be a list for the tags-input
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
    $http.get('/api/examsessions/' + $stateParams.examsessionCode).success(function(data, status, headers, config) {
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
        var code = vm.exam.examsession.code;
        var title = vm.exam.title;
        // Clear form fields
        vm.exam.title = '';
        vm.exam.course = [];
        vm.exam.examsession = null;
        vm.exam.date = null;
        vm.exam.duration = 0;

        if (!examId) {
          $state.go('manage.examsessions.view', {
            examsessionCode: code
          });
        } else {
          $state.go('manage.examsessions.viewexam', {
            examsessionCode: code,
            examId: examId
          });
        }
        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')(examId ? 'EXAM.SUCCESSFUL_UPDATE' : 'EXAMSESSION.SUCCESSFUL_EXAMADD', { title: title, code: code }) });
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
