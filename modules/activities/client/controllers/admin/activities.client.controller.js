(function () {
  'use strict';

  angular
    .module('activities.admin')
    .controller('ActivitiesAdminController', ActivitiesAdminController);

  ActivitiesAdminController.$inject = ['$scope', '$state', '$http', 'activityResolve', '$window', 'Authentication', 'Notification', '$filter'];

  function ActivitiesAdminController($scope, $state, $http, activity, $window, Authentication, Notification, $filter) {
    var vm = this;

    vm.activity = activity;
    vm.activityname = activity.name;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;
    vm.loadTeachers = loadTeachers;
    vm.isFormReady = isFormReady;

    // Initialise the list of evaluations
    var evaluationsList = ['written', 'oral', 'assignment', 'project'];
    vm.activityevaluations = {};
    evaluationsList.forEach(function(element) {
      vm.activityevaluations[element] = vm.activity.evaluations.includes(element);
    });

    var activityId = activity._id;

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

      // Build the list of evaluations
      vm.activity.evaluations = [];
      evaluationsList.forEach(function(element) {
        if (vm.activityevaluations[element]) {
          vm.activity.evaluations.push(element);
        }
      });

      // Create a new activity, or update the current instance
      vm.activity.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        var code = vm.activity.code;

        if (activityId) {
          $state.go('admin.manage.activities.view', {
            activityCode: code
          });
        } else {
          $state.go('admin.manage.activities.list');
        }
        Notification.success({
          message: '<i class="glyphicon glyphicon-exclamation-sign"></i> ' + $filter('translate')(activityId ? 'ACTIVITY.SUCCESSFUL_UPDATE' : 'ACTIVITY.SUCCESSFUL_CREATION', { code: code })
        });
      }

      function errorCallback(res) {
        Notification.error({
          title: '<i class="glyphicon glyphicon-remove"></i> Activity save error!',
          message: res.data.message
        });
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
