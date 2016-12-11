(function () {
  'use strict';

  angular
    .module('rooms')
    .controller('RoomsController', RoomsController);

  RoomsController.$inject = ['$scope', '$state', 'roomResolve', '$window', '$http', 'Authentication', 'Notification', '$filter'];

  function RoomsController($scope, $state, room, $window, $http, Authentication, Notification, $filter) {
    var vm = this;

    vm.room = room;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.drawMap = drawMap;

    var roomId = room._id;

    // Save room
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.roomForm');
        return false;
      }

      // Create a new room, or update the current instance
      vm.room.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        var code = vm.room.code;
        // Clear form fields
        vm.room.code = '';
        vm.room.name = '';
        vm.room.nbseats = '';

        if (roomId) {
          $state.go('admin.manage.rooms.view', {
            roomCode: code
          });
        } else {
          $state.go('admin.manage.rooms.list');
        }
        Notification.success({ message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')(roomId ? 'ROOM.SUCCESSFUL_UPDATE' : 'ROOM.SUCCESSFUL_CREATION', { code: code }) });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Draw the map
    function drawMap() {
      var map = vm.room.map;

      // Setup canvas
      var canvas = document.getElementById('roomMap');
      canvas.width = map.width;
      canvas.height = map.height;

      // Initialise context
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, map.width, map.height);
      context.strokeRect(0, 0, map.width, map.height);

      // Context style
      context.scale(1, 1);
      context.font = 'normal 7pt Arial';

      // Draw the seats
      for (var i = 0; i < map.seats.length; i++) {
        var seat = map.seats[i];
        var rect = seat.rect;
        context.fillStyle = 'rgba(0, 0, 90, 0.2)';
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.fillStyle = 'black';
        context.fillText('#' + (i + 1), seat.x, seat.y);
      }

      // Draw the shapes
      map.shapes.forEach(function (shape) {
        var attr = shape.attr;
        switch (shape.type) {
          case 'rectangle':
            context.strokeRect(attr.x, attr.y, attr.width, attr.height);
            break;
        }
      });
    }
  }
}());
