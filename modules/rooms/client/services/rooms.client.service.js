(function () {
  'use strict';

  angular
    .module('rooms.services')
    .factory('RoomsService', RoomsService);

  RoomsService.$inject = ['$resource'];

  function RoomsService($resource) {
    var Room = $resource('api/rooms');

    return Room;
  }
}());
