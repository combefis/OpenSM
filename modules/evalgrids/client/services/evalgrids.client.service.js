(function () {
  'use strict';

  angular
    .module('evalgrids.services')
    .factory('EvalGridsService', EvalGridsService);

  EvalGridsService.$inject = ['$resource'];

  function EvalGridsService($resource) {
    var EvalGrid = $resource('api/evalgrids/:evalgridCode', {
      evalgridCode: ''
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(EvalGrid.prototype, {
      createOrUpdate: function() {
        var evalgrid = this;
        return createOrUpdate(evalgrid);
      }
    });

    return EvalGrid;

    function createOrUpdate(evalgrid) {
      if (evalgrid._id) {
        return evalgrid.$update({ evalgridCode: evalgrid.code }, onSuccess, onError);
      }
      return evalgrid.$save(onSuccess, onError);

      // Handle successful response
      function onSuccess(evalgrid) {
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
