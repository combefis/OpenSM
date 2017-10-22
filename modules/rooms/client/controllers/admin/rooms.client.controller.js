(function() {
  'use strict';

  angular
    .module('rooms.admin')
    .controller('RoomsController', RoomsController);

  RoomsController.$inject = ['$scope', '$state', 'roomResolve', 'Authentication', 'Notification', '$filter'];

  function RoomsController($scope, $state, room, Authentication, Notification, $filter) {
    var vm = this;

    vm.room = room;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;
    vm.configuration = null;
    vm.startseat = 1;
    vm.config = {
      room: vm.room,
      configuration: null,
      startseat: 1
    };
    vm.changeConfiguration = changeConfiguration;

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
        vm.room.building = '';
        vm.room.floor = '';
        vm.room.nbseats = '';

        if (roomId) {
          $state.go('admin.manage.rooms.view', { roomCode: code });
          Notification.success({
            title: '<i class="glyphicon glyphicon-exclamation-pencil"></i> ' + $filter('translate')('ROOM.UPDATE'),
            message: $filter('translate')('ROOM.SUCCESSFUL_UPDATE', { code: code })
          });
        } else {
          $state.go('admin.manage.rooms.list');
          Notification.success({
            title: '<i class="glyphicon glyphicon-exclamation-add"></i> ' + $filter('translate')('ROOM.CREATION'),
            message: $filter('translate')('ROOM.SUCCESSFUL_CREATION', { code: code })
          });
        }
      }

      function errorCallback(res) {
        Notification.error({
          title: '<i class="glyphicon glyphicon-remove"></i> ' + $filter('translate')('GENERAL.ERROR'),
          message: res.data.message
        });
      }
    }

    // Change the shown configuration
    function changeConfiguration() {
      if (vm.configuration !== null) {
        vm.config = {
          room: vm.room,
          configuration: vm.configuration,
          startseat: vm.startseat
        };

        Notification.success({
          title: '<i class="glyphicon glyphicon-exclamation-pencil"></i> ' + $filter('translate')('ROOM.UPDATE'),
          message: $filter('translate')('ROOM.CONFIGURATION_CHANGED')
        });
      }
    }
  }
}());
