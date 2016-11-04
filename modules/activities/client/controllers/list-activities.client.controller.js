(function () {
  'use strict';

  angular
    .module('activities')
    .controller('ActivitiesListController', ActivitiesListController);

  ActivitiesListController.$inject = ['ActivitiesService'];

  function ActivitiesListController(ActivitiesService) {
    var vm = this;

    vm.activities = ActivitiesService.query();
  }
}());
