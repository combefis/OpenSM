(function () {
  'use strict';

  angular
    .module('exams.admin')
    .controller('ViewExamAdminController', ViewExamAdminController);

  ViewExamAdminController.$inject = ['$scope', '$state', '$http', 'examResolve', '$window', 'Authentication', 'Notification', '$filter', 'Upload'];

  function ViewExamAdminController($scope, $state, $http, exam, $window, Authentication, Notification, $filter, Upload) {
    var vm = this;

    vm.exam = exam;
    vm.examtitle = exam.title;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.validate = validate;
    vm.assignSeats = assignSeats;

    // Students management
    vm.students = null;
    vm.addStudent = addStudent;
    vm.removeStudent = removeStudent;

    // Rooms management
    vm.rooms = null;
    vm.addRoom = addRoom;
    vm.removeRoom = removeRoom;
    vm.config = Array.apply(null, new Array(vm.exam.rooms.length)).map(function(x, i) {
      return {
        room: vm.exam.rooms[i].room,
        configuration: vm.exam.rooms[i].configuration,
        startseat: vm.exam.rooms[i].startseat,
        registrations: getRegistrations(i)
      };
    });
    vm.changeConfiguration = changeConfiguration;
    vm.downloadMap = downloadMap;

    // Copies management
    var nbCopies = vm.exam.copies.length;
    vm.uploading = Array.apply(null, new Array(nbCopies)).map(function(x, i) { return false; });
    vm.progressValue = Array.apply(null, new Array(nbCopies)).map(function(x, i) { return null; });
    vm.getLetter = getLetter;
    vm.addCopy = addCopy;
    vm.removeCopy = removeCopy;
    vm.uploadCopy = uploadCopy;
    vm.downloadCopy = downloadCopy;
    vm.validateCopy = validateCopy;
    vm.validateCopies = validateCopies;

    // Load the list of students for the registrations
    $http.get('/api/students').success(function(data, status, headers, config) {
      vm.students = data;

      // Remove already selected students
      vm.exam.registrations.forEach(function (element) {
        var username = element.student.username;
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
        var code = element.room.code;
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

      function onSuccess(response) {
        $state.go('admin.manage.exams.list');
        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.SUCCESSFUL_DELETE') });
      }

      function onError(err) {
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + err.data.message });
      }
    }

    // Validate exam
    function validate() {
      if ($window.confirm('Are you sure you want to validate this exam?')) {
        $http.post('/api/exams/' + vm.exam._id + '/validate').then(onSuccess, onError);
      }

      function onSuccess(response) {
        vm.exam.registrations = response.data.registrations;
        vm.exam.validation = response.data.validation;
        for (var i = 0; i < vm.exam.rooms.length; i++) {
          vm.config[i] = {
            room: vm.exam.rooms[i].room,
            configuration: vm.exam.rooms[i].configuration,
            startseat: vm.exam.rooms[i].startseat,
            registrations: getRegistrations(i)
          };
        }

        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.SUCCESSFUL_VALIDATION') });
      }

      function onError(err) {
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + err.data.message });
      }
    }

    // Get registrations for a room
    function getRegistrations (i) {
      return $filter('filter')(vm.exam.registrations, function (element) {
        return element.room === i;
      });
    }

    // Compute the seat assignment of students
    function assignSeats() {
      $http.post('/api/exams/' + vm.exam._id + '/assignseats').then(onSuccess, onError);

      function onSuccess(response) {
        vm.exam.registrations = response.data;
        for (var i = 0; i < vm.exam.rooms.length; i++) {
          vm.config[i] = {
            room: vm.exam.rooms[i].room,
            configuration: vm.exam.rooms[i].configuration,
            startseat: vm.exam.rooms[i].startseat,
            registrations: getRegistrations(i)
          };
        }

        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.SEATS_ASSIGNED') });
      }

      function onError(err) {
        Notification.error({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + err.data.message });
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
          var username = vm.selectedStudent.username;
          vm.selectedStudent = undefined;
          vm.exam.registrations = response.data;

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.STUDENT_SUCCESSFUL_ADD', { username: username }) });
        });
      }
    }

    // Remove a student of the exam
    function removeStudent(i) {
      if ($window.confirm('Are you sure you want to delete this student?')) {
        var student = vm.exam.registrations[i].student;

        $http.delete('/api/exams/' + vm.exam._id + '/student/' + i)
        .then(function(response) {
          vm.students.push(student);
          vm.exam.registrations = response.data;

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.STUDENT_SUCCESSFUL_DELETE', { username: student.username }) });
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
          var code = vm.selectedRoom.code;
          vm.selectedRoom = undefined;
          vm.exam.rooms = response.data;

          var i = vm.exam.rooms.length - 1;
          vm.config.push({
            room: vm.exam.rooms[i].room,
            configuration: vm.exam.rooms[i].configuration,
            startseat: vm.exam.rooms[i].startseat
          });

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.ROOM_SUCCESSFUL_ADD', { code: code }) });
        });
      }
    }

    // Remove a room of the exam
    function removeRoom(i) {
      if ($window.confirm('Are you sure you want to delete this room?')) {
        var room = vm.exam.rooms[i].room;

        $http.delete('/api/exams/' + vm.exam._id + '/room/' + i)
        .then(function(response) {
          vm.rooms.push(room);
          vm.config.splice(i, 1);
          vm.exam.rooms = response.data;

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('EXAM.ROOM_SUCCESSFUL_DELETE', { code: room.code }) });
        });
      }
    }

    // Change the shown configuration
    function changeConfiguration(i) {
      if (vm.exam.rooms[i].configuration !== null) {
        $http.post('/api/exams/' + vm.exam._id + '/room/' + i + '/configure', { configuration: vm.exam.rooms[i].configuration, startseat: vm.exam.rooms[i].startseat })
        .then(function(response) {
          vm.exam.copies = response.data;
          vm.config[i] = {
            room: vm.exam.rooms[i].room,
            configuration: vm.exam.rooms[i].configuration,
            startseat: vm.exam.rooms[i].configuration.startseat
          };

          Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')('ROOM.CONFIGURATION_CHANGED') });
        });
      }
    }

    // Download the map of a room
    function downloadMap(i) {
      $window.open('/api/exams/' + vm.exam._id + '/room/' + i + '/map');
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
  }
}());
