(function() {
  'use strict';

  angular
    .module('exams.services')
    .factory('ExamsService', ExamsService);

  ExamsService.$inject = ['$resource', '$log'];

  function ExamsService($resource, $log) {
    var Exam = $resource('/api/exams/:examId', {
      examId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Exam.prototype, {
      createOrUpdate: function() {
        var exam = this;
        return createOrUpdate(exam);
      }
    });

    return Exam;

    function createOrUpdate(exam) {
      if (exam._id) {
        return exam.$update(onSuccess, onError);
      }
      return exam.$save(onSuccess, onError);

      // Handle successful response
      function onSuccess(exam) {
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
      $log.error(error);
    }
  }
}());
