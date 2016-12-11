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
    vm.remove = remove;
    vm.validate = validate;

    // Students management
    vm.students = null;
    vm.addStudent = addStudent;
    vm.removeStudent = removeStudent;

    // Rooms management
    vm.rooms = null;
    vm.getLetter = getLetter;
    vm.addRoom = addRoom;
    vm.removeRoom = removeRoom;

    // Copies management
    var nbCopies = vm.exam.copies.length;
    vm.uploading = Array.apply(null, new Array(nbCopies)).map(function(x, i) { return false; });
    vm.progressValue = Array.apply(null, new Array(nbCopies)).map(function(x, i) { return null; });
    vm.addCopy = addCopy;
    vm.removeCopy = removeCopy;
    vm.uploadCopy = uploadCopy;
    vm.downloadCopy = downloadCopy;

    // Load the exam session
    $http.get('/api/examsessions/' + $stateParams.examsessionCode).success(function(data, status, headers, config) {
      vm.examsession = data;
    });

    // Load the list of students for the registrations
    $http.get('/api/students').success(function(data, status, headers, config) {
      vm.students = data;

      // Remove already selected students
      vm.exam.registrations.forEach(function (element) {
        var username = element.username;
        vm.students.splice(vm.students.findIndex(function (element) {
          return element.username === username;
        }), 1);
      });
    });

    // Load the list of rooms for the rooms
    $http.get('/api/rooms').success(function(data, status, headers, config) {
      vm.rooms = data;

      // Remove already selected rooms
      vm.exam.rooms.forEach(function (element) {
        var code = element.code;
        vm.rooms.splice(vm.rooms.findIndex(function (element) {
          return element.code === code;
        }), 1);
      });
    });

    // Remove existing exam
    function remove() {
      if ($window.confirm('Are you sure you want to delete this exam?')) {
        vm.exam.$remove({ examId: exam._id }, onSuccess, onError);
      }

      function onSuccess(examsession) {
        $state.go('manage.examsessions.view', {
          examsessionCode: vm.examsession.code
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.SUCCESSFUL_DELETE') });
      }

      function onError(errorResponse) {
        var error = errorResponse.data;
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + error.message });
      }
    }

    // Validate exam
    function validate() {
      if ($window.confirm('Are you sure you want to validate this exam?')) {
        $http.post('/api/exams/' + vm.exam._id + '/validate')
        .then(function(response) {
          vm.exam.ready = response.data;
        });
      }
    }

    // Add a student to the exam
    function addStudent() {
      if (vm.selectedStudent) {
        $http.post('/api/exams/' + vm.exam._id + '/student', { 'studentUsername': vm.selectedStudent.username })
        .then(function(response) {
          vm.students.splice(vm.students.findIndex(function (element) {
            return element.username === vm.selectedStudent.username;
          }), 1);
          vm.selectedStudent = undefined;
          vm.exam.registrations = response.data;
        });
      }
    }

    // Remove a student of the exam
    function removeStudent(i) {
      if ($window.confirm('Are you sure you want to delete this student?')) {
        var student = vm.exam.registrations[i];

        $http.delete('/api/exams/' + vm.exam._id + '/student/' + i)
        .then(function(response) {
          vm.students.push(student);
          vm.exam.registrations = response.data;

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.STUDENT_SUCCESSFUL_DELETE') });
        });
      }
    }

    // Convert an integer to a letter 1 => A, 2 => B...
    function getLetter (i) {
      return String.fromCharCode(64 + i);
    }

    // Add a room to the exam
    function addRoom() {
      if (vm.selectedRoom) {
        $http.post('/api/exams/' + vm.exam._id + '/room', { 'roomCode': vm.selectedRoom.code })
        .then(function(response) {
          vm.rooms.splice(vm.rooms.findIndex(function (element) {
            return element.code === vm.selectedRoom.code;
          }), 1);
          vm.selectedRoom = undefined;
          vm.exam.rooms = response.data;
        });
      }
    }

    // Remove a room of the exam
    function removeRoom(i) {
      if ($window.confirm('Are you sure you want to delete this room?')) {
        var room = vm.exam.rooms[i];

        $http.delete('/api/exams/' + vm.exam._id + '/room/' + i)
        .then(function(response) {
          vm.rooms.push(room);
          vm.exam.rooms = response.data;

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.ROOM_SUCCESSFUL_DELETE') });
        });
      }
    }

    // Add a copy to the exam
    function addCopy() {
      $http.post('/api/exams/' + vm.exam._id + '/copy')
      .then(function(response) {
        vm.exam.copies = response.data;
      });
    }

    // Remove a copy of the exam
    function removeCopy(i) {
      if ($window.confirm('Are you sure you want to delete this questionnaire?')) {
        $http.delete('/api/exams/' + vm.exam._id + '/copy/' + i)
        .then(function(response) {
          vm.exam.copies = response.data;

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.COPY_SUCCESSFUL_DELETE') });
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
  }
}());
