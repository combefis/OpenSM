(function() {
  'use strict';

  angular
    .module('exams')
    .controller('ViewExamController', ViewExamController);

  ViewExamController.$inject = ['$scope', '$state', '$http', 'examResolve', '$window', 'Authentication', '$stateParams', 'Notification', '$filter', 'Upload'];

  function ViewExamController($scope, $state, $http, exam, $window, Authentication, $stateParams, Notification, $filter, Upload) {
    var vm = this;

    vm.exam = exam;
    vm.examtitle = exam.title;
    vm.examsession = null;
    vm.authentication = Authentication;

    // Copies management
    var nbCopies = vm.exam.copies.length;
    vm.uploading = Array.apply(null, new Array(nbCopies)).map(function(x, i) { return false; });
    vm.progressValue = Array.apply(null, new Array(nbCopies)).map(function(x, i) { return null; });
    vm.generatingCopies = false;
    vm.getLetter = getLetter;
    vm.canManageCopies = canManageCopies;
    vm.addCopy = addCopy;
    vm.removeCopy = removeCopy;
    vm.uploadCopy = uploadCopy;
    vm.downloadCopy = downloadCopy;
    vm.validateCopy = validateCopy;
    vm.validateCopies = validateCopies;
    vm.generateCopies = generateCopies;
    vm.markCopiesPrinted = markCopiesPrinted;

    // Room management
    vm.config = Array.apply(null, new Array(vm.exam.rooms.length)).map(function(x, i) {
      return {
        course: vm.exam.course.code + ' ' + vm.exam.course.name,
        date: moment(vm.exam.date).format('MMMM Do YYYY, h:mm:ss a'),
        room: vm.exam.rooms[i].room,
        configuration: vm.exam.rooms[i].configuration,
        startseat: vm.exam.rooms[i].startseat,
        registrations: getRegistrations(i)
      };
    });

    // Load the exam session
    $http.get('/api/examsessions/' + $stateParams.examsessionCode).success(function(data, status, headers, config) {
      vm.examsession = data;
    });

    // Compute the step number in the exam process
    function examstep(validation) {
      if (validation && validation.printings) {
        return 4;
      } else if (validation && validation.registrations) {
        return 3;
      } else if (validation && validation.copies) {
        return 2;
      }
      return 1;
    }
    vm.examstep = examstep(vm.exam.validation);

    // Get registrations for a room
    function getRegistrations (i) {
      return $filter('filter')(vm.exam.registrations, function (element) {
        return element.room === i;
      });
    }

    // Convert an integer to a letter 1 => A, 2 => B...
    function getLetter (i) {
      return String.fromCharCode(64 + i);
    }

    // Check whether can manage copies
    function canManageCopies() {
      return vm.exam.course.team.some(function (element) {
        return element.username === vm.authentication.user.username;
      });
    }

    // Add a copy to the exam
    function addCopy() {
      $http.post('/api/exams/' + vm.exam._id + '/copy')
      .then(function(response) {
        vm.exam.copies = response.data;

        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.COPY.SUCCESSFUL_ADD') });
      });
    }

    // Remove a copy of the exam
    function removeCopy(i) {
      if ($window.confirm('Are you sure you want to delete this questionnaire?')) {
        $http.delete('/api/exams/' + vm.exam._id + '/copy/' + i)
        .then(function(response) {
          vm.exam.copies = response.data;

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.COPY.SUCCESSFUL_DELETE') });
        });
      }
    }

    // Upload a copy for the exam
    function uploadCopy(file, i) {
      vm.uploading[i] = true;
      vm.progressValue[i] = 0;
      Upload.upload({
        url: '/api/exams/' + vm.exam._id + '/copy/' + i + '/upload',
        data: {
          file: file,
          index: i,
          username: vm.authentication.user
        }
      }).then(function (response) {
        vm.uploading[i] = false;
        vm.progressValue[i] = null;
        vm.exam.copies = response.data;
      }, function (response) {
        console.log('Error');
        vm.uploading[i] = false;
        vm.progressValue[i] = null;
      }, function (event) {
        vm.progressValue[i] = parseInt(100.0 * event.loaded / event.total, 10);
      });
    }

    // Download a copy of the exam
    function downloadCopy(i) {
      $window.open('/api/exams/' + vm.exam._id + '/copy/' + i + '/download');
    }

    // Validate a copy of the exam
    function validateCopy(i) {
      $http.post('/api/exams/' + vm.exam._id + '/copy/' + i + '/validate')
      .then(function(response) {
        vm.exam.copies = response.data;
      });
    }

    // Validate the copies of the exam
    function validateCopies() {
      $http.post('/api/exams/' + vm.exam._id + '/copies/validate').then(onSuccess, onError);

      function onSuccess(response) {
        vm.exam.validation = response.data;

        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.COPY.SUCCESSFUL_VALIDATION') });
      }

      function onError(err) {
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + err.data.message });
      }
    }

    // Generate the copies of the exam
    function generateCopies() {
      vm.generatingCopies = true;
      $http.post('/api/exams/' + vm.exam._id + '/copies/generate').then(onSuccess, onError);

      function onSuccess(response) {
        vm.exam.generated = response.data;
        vm.generatingCopies = false;

        Notification.success({
          title: '<i class="glyphicon glyphicon-screenshot"></i> ' + $filter('translate')('EXAM.COPY.GENERATION'),
          message: $filter('translate')('EXAM.COPY.SUCCESSFUL_GENERATION')
        });
      }

      function onError(err) {
        vm.generatingCopies = false;

        Notification.error({
          title: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('GENERAL.ERROR'),
          message: err.data.message
        });
      }
    }

    // Mark the copies of the exam as printed
    function markCopiesPrinted() {
      $http.post('/api/exams/' + vm.exam._id + '/copies/markasprinted').then(onSuccess, onError);

      function onSuccess(response) {
        vm.exam.validation = response.data;
        vm.examstep = examstep(vm.exam.validation);

        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.COPY.SUCCESSFUL_MARKASPRINTED') });
      }

      function onError(err) {
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + err.data.message });
      }
    }
  }
}());
