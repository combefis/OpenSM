(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsManagerDeadlinesController', InternshipsManagerDeadlinesController);

  InternshipsManagerDeadlinesController.$inject = ['$scope', '$state', '$window', 'Authentication', '$http', '$filter', 'InternshipsService', 'DeadlinesService', '$rootScope', 'deadlinesResolve'];

  function InternshipsManagerDeadlinesController($scope, $state, $window, Authentication, $http, filter, InternshipsService, DeadlinesService, $rootScope, deadlinesResolve) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer
    vm.internships = InternshipsService.query();
    vm.updateDeadlines = updateDeadlines;
    getDeadlines();

    vm.filterSelect = 'overview';
    vm.filterOptions = ['overview', 'enterprise', 'proposition', 'supervisor', 'convention', 'deadlines'];


    function updateDeadlines() {

      // $http.put('/api/internships/convention', { 'internships': internshipsConventionGivenList }).success(successCallback);

      console.log('coucou');
      console.log(vm.deadlines);

      vm.deadlines.createOrUpdate()          // appel à la fonction dans le service
        .then(successCallback)
        .catch(errorCallback);

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }

      function successCallback(res) {
        alert('Success! internships updated.');
        // location.reload();
        getDeadlines();
      // $state.go('coordinator.manage.internships.list');
      }
    }

    function getDeadlines() {
      vm.deadlines = deadlinesResolve;
      vm.deadlines.coordinatorMeeting ? vm.deadlines.coordinatorMeeting = new Date(vm.deadlines.coordinatorMeeting) : {};
      vm.deadlines.foreignInternshipDemand ? vm.deadlines.foreignInternshipDemand = new Date(vm.deadlines.foreignInternshipDemand) : {};
      vm.deadlines.convention ? vm.deadlines.convention = new Date(vm.deadlines.convention) : {};
      vm.deadlines.activitiesNote ? vm.deadlines.activitiesNote = new Date(vm.deadlines.activitiesNote) : {};
      vm.deadlines.firstVisit ? vm.deadlines.firstVisit = new Date(vm.deadlines.firstVisit) : {};
      vm.deadlines.autoEvaluation ? vm.deadlines.autoEvaluation = new Date(vm.deadlines.autoEvaluation) : {};
      vm.deadlines.oralPresentation ? vm.deadlines.oralPresentation = new Date(vm.deadlines.oralPresentation) : {};
      vm.deadlines.writtenReport ? vm.deadlines.writtenReport = new Date(vm.deadlines.writtenReport) : {};
      vm.deadlines.completeEvaluation ? vm.deadlines.completeEvaluation = new Date(vm.deadlines.completeEvaluation) : {};
    }

    vm.format = 'yyyy/MM/dd';
    vm.inlineOptions = {
      minDate: new Date(),
      showWeeks: true
    };
    vm.dateOptions = {
      dateDisabled: 'disabled',
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    vm.open1 = function() {
      vm.deadlines.coordinatorMeeting = new Date();
      vm.popup1.opened = true;
    };

    vm.open2 = function() {
      vm.deadlines.foreignInternshipDemand = new Date();
      vm.popup2.opened = true;
    };

    vm.open3 = function() {
      vm.deadlines.convention = new Date();
      vm.popup3.opened = true;
    };

    vm.open4 = function() {
      vm.deadlines.activitiesNote = new Date();
      vm.popup4.opened = true;
    };

    vm.open5 = function() {
      vm.deadlines.firstVisit = new Date();
      vm.popup5.opened = true;
    };

    vm.open6 = function() {
      vm.deadlines.autoEvaluation = new Date();
      vm.popup6.opened = true;
    };

    vm.open7 = function() {
      vm.deadlines.oralPresentation = new Date();
      vm.popup7.opened = true;
    };

    vm.open8 = function() {
      vm.deadlines.writtenReport = new Date();
      vm.popup8.opened = true;
    };

    vm.open9 = function() {
      vm.deadlines.completeEvaluation = new Date();
      vm.popup9.opened = true;
    };

    vm.popup1 = {
      opened: false
    };
    vm.popup2 = {
      opened: false
    };
    vm.popup3 = {
      opened: false
    };
    vm.popup4 = {
      opened: false
    };
    vm.popup5 = {
      opened: false
    };
    vm.popup6 = {
      opened: false
    };
    vm.popup7 = {
      opened: false
    };
    vm.popup8 = {
      opened: false
    };
    vm.popup9 = {
      opened: false
    };
  }

}());
