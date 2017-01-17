(function () {
  'use strict';

  angular
    .module('examsessions.services')
    .factory('ExamSessionsService', ExamSessionsService);

  ExamSessionsService.$inject = ['$resource'];

  function ExamSessionsService($resource) {
    var ExamSession = $resource('api/examsessions/:examsessionCode', {
      examsessionCode: ''
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(ExamSession.prototype, {
      createOrUpdate: function() {
        var examsession = this;
        return createOrUpdate(examsession);
      }
    });

    return ExamSession;

    function createOrUpdate(examsession) {
      if (examsession._id) {
        return examsession.$update({ examsessionCode: examsession.code }, onSuccess, onError);
      }
      return examsession.$save(onSuccess, onError);

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
