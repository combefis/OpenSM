(function () {
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
    vm.getLetter = getLetter;
    vm.canManageCopies = canManageCopies;
    vm.addCopy = addCopy;
    vm.removeCopy = removeCopy;
    vm.uploadCopy = uploadCopy;
    vm.downloadCopy = downloadCopy;
    vm.validateCopy = validateCopy;
    vm.validateCopies = validateCopies;
    vm.generateCopies = generateCopies;

    // Room management
    vm.config = Array.apply(null, new Array(vm.exam.rooms.length)).map(function(x, i) {
      return {
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
      $http.post('/api/exams/' + vm.exam._id + '/copies/generate').then(onSuccess, onError);

      function onSuccess(response) {
        console.log(response.data);

        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.COPY.SUCCESSFUL_VALIDATION') });
      }

      function onError(err) {
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + err.data.message });
      }
    }
  }
}());
