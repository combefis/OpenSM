(function () {
  'use strict';

  angular
    .module('activities.admin')
    .controller('ActivitiesListAdminController', ActivitiesListAdminController);

  ActivitiesListAdminController.$inject = ['ActivitiesService'];

  function ActivitiesListAdminController(ActivitiesService) {
    var vm = this;

    vm.activities = ActivitiesService.query();
  }
}());
