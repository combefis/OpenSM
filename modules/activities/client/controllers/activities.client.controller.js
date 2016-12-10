(function () {
  'use strict';

  angular
    .module('activities')
    .controller('ActivitiesController', ActivitiesController);

  ActivitiesController.$inject = ['$scope', '$state', '$http', 'activityResolve', '$window', 'Authentication', '$filter'];

  function ActivitiesController($scope, $state, $http, activity, $window, Authentication, $filter) {
    var vm = this;

    vm.activity = activity;
    vm.activityname = activity.name;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.loadTeachers = loadTeachers;
    vm.isFormReady = isFormReady;

    var tagsInputListsLoaded = [false];

    // Load the list of teachers for the tags-input
    var teachersList = [];
    $http.get('/api/teachers').success(function(data, status, headers, config) {
      teachersList = data;
      tagsInputListsLoaded[0] = true;
    });

    // Save activity
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.activityForm');
        return false;
      }

      // Create a new activity, or update the current instance
      vm.activity.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.manage.activities.view', {
          activityCode: res.code
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Generate list of teachers
    function loadTeachers(query) {
      return $filter('filter')(teachersList, query);
    }

    // Test whether the form is ready to be displayed and used
    function isFormReady() {
      return tagsInputListsLoaded.every(function(data) {return data;});
    }
  }
}());
