(function () {
  'use strict';

  angular
    .module('activities.services')
    .factory('ActivitiesService', ActivitiesService);

  ActivitiesService.$inject = ['$resource'];

  function ActivitiesService($resource) {
    var Activity = $resource('api/activities/:activityId', {
      activityId: '@_id'
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
        return activity.$update(onSuccess, onError);
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
      console.log(error);
    }
  }
}());
