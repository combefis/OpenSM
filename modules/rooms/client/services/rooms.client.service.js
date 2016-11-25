(function () {
  'use strict';

  angular
    .module('rooms.services')
    .factory('RoomsService', RoomsService);

  RoomsService.$inject = ['$resource'];

  function RoomsService($resource) {
    var Room = $resource('api/rooms/:roomCode', {
      roomCode: ''
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Room.prototype, {
      createOrUpdate: function() {
        var room = this;
        return createOrUpdate(room);
      }
    });

    return Room;

    function createOrUpdate(room) {
      if (room._id) {
        return room.$update(onSuccess, onError);
      }
      return room.$save(onSuccess, onError);

      // Handle successful response
      function onSuccess(examsession) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
