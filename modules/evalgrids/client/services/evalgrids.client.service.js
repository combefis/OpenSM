(function () {
  'use strict';

  angular
    .module('evalgrids.services')
    .factory('EvalGridsService', EvalGridsService);

  EvalGridsService.$inject = ['$resource'];

  function EvalGridsService($resource) {
    var EvalGrid = $resource('api/evalgrids/:evalgridCode', {
      evalgridCode: ''
    });

    return EvalGrid;
  }
}());
