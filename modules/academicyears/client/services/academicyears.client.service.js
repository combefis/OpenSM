(function () {
  'use strict';

  angular
    .module('academicyears.services')
    .factory('AcademicYearsService', AcademicYearsService);

  AcademicYearsService.$inject = ['$resource', '$log'];

  function AcademicYearsService($resource, $log) {
    var AcademicYear = $resource('/api/academicyears/:academicyearCode', {
      academicyearCode: ''
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(AcademicYear.prototype, {
      createOrUpdate: function() {
        var academicyear = this;
        return createOrUpdate(academicyear);
      }
    });

    return AcademicYear;

    function createOrUpdate(academicyear) {
      if (academicyear._id) {
        return academicyear.$update({ academicyearCode: academicyear.code }, onSuccess, onError);
      }
      return academicyear.$save(onSuccess, onError);

      // Handle successful response
      function onSuccess(academicyear) {
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
