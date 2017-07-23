(function () {
  'use strict';

  angular
    .module('activities.services')
    .factory('ActivitiesService', ActivitiesService);

  ActivitiesService.$inject = ['$resource', '$log'];

  function ActivitiesService($resource, $log) {
    var Activity = $resource('/api/activities/:activityCode', {
      activityCode: ''
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Activity.prototype, {
      createOrUpdate: function() {
        var activity = this;
        return createOrUpdate(activity);
      }
    });

    return Activity;

    function createOrUpdate(activity) {
      if (activity._id) {
        return activity.$update({ activityCode: activity.code }, onSuccess, onError);
      }
      return activity.$save(onSuccess, onError);

      // Handle successful response
      function onSuccess(activity) {
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
