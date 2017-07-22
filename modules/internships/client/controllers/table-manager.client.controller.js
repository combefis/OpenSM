(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsManagerTableController', InternshipsManagerTableController);

  InternshipsManagerTableController.$inject = ['$scope', '$state', '$window', 'Authentication', '$http', '$filter', 'InternshipsService', 'DeadlinesService', '$rootScope', 'deadlinesResolve'];

  function InternshipsManagerTableController($scope, $state, $window, Authentication, $http, filter, InternshipsService, DeadlinesService, $rootScope, deadlinesResolve) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer
    vm.saveDates = saveDates;
    vm.updateSelection = updateSelection;
    vm.validateAll = validateAll;
    vm.deadlinesCollection = DeadlinesService.query();
    vm.deadlines = deadlinesResolve;
    vm.open = open;
    vm.validateConventions = validateConventions;
    vm.giveConventions = giveConventions;
    vm.createDeadlines = createDeadlines;
    vm.validateDeliverables = validateDeliverables;
    vm.filterSelect = 'overview';
    vm.filterOptions = ['overview', 'enterprise', 'proposition', 'supervisor', 'convention', 'delivrables', 'deadlines'];

    vm.internships = InternshipsService.query(function(internships) {
      internships.forEach(function(internship) {
        if (!internship.deadlines) {internship.deadlines = {};}
        if (internship.deadlines.startInternship) {
          internship.deadlines.startInternship = new Date(internship.deadlines.startInternship);
        }
        if (internship.deadlines.endInternship) {
          internship.deadlines.endInternship = new Date(internship.deadlines.endInternship);
        }
        internship.startPopup = { opened: false };
        internship.endPopup = { opened: false };
      });
      vm.allValidated = internships.every(function(internship) {return ((internship.managerApproval) && (internship.validatorApproval));});
    });

    function validateAll() {
      var nb = vm.internships.length;
      vm.internships.forEach(function(internship, i) {
        internship.managerApproval = true;
        if (i === (nb - 1)) {
          send();
        }
      });

      function send() {
        $http.put('/api/internships/validation', { 'internships': vm.internships }).success(successCallback);
      }

      function successCallback(res) {
        alert('Success! internships validated.');
        vm.allValidated = vm.internships.every(function(internship) {return internship.managerApproval;});
      // location.reload();
      // $state.go('coordinator.manage.internships.list');
      }
    }

    function saveDates() {
      $http.put('/api/internships/startEndDates', { 'internships': vm.internships }).success(successCallback);

      function successCallback(res) {
        alert('Success! internships updated.');
      // location.reload();
      // $state.go('coordinator.manage.internships.list');
      }
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

    function open(internship, popup, target) {
      console.log(internship);
      console.log('popup:' + popup);
      console.log(target);
      if (!internship.deadlines) { internship.deadlines = {};}
      internship.deadlines[target] = new Date();
      internship[popup].opened = true;
    }

    function createDeadlines() {
      vm.deadlines.academicYear = prompt("Please enter academic year.", "2016-2017");
      vm.deadlines.createOrUpdate()          // appel à la fonction dans le service
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        console.log('all is good');
        vm.deadlinesCollection = DeadlinesService.query();
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }

    function updateSelection(internship) {
      $rootScope.internships = vm.internships;
      console.log($rootScope.internships);
    }

    function validateConventions(internship) {
      var internshipsConventionValidateList = [];
      internship.convention.validation = true;
      internshipsConventionValidateList.push(internship);

      $http.put('/api/internships/convention', { 'internships': internshipsConventionValidateList }).success(successCallback);

      function successCallback(res) {
        alert('Success! internships updated.');
      }
    }

    function giveConventions(internship) {
      var internshipsConventionGivenList = [];
      internship.convention.given = true;
      internshipsConventionGivenList.push(internship);
      $http.put('/api/internships/convention', { 'internships': internshipsConventionGivenList }).success(successCallback);
      function successCallback(res) {
        alert('Success! internship updated.');
      }
    }

    function validateDeliverables(internship, deliverable) {
      if (deliverable === 'certificate') {
        internship.certificate.handedIn = true;
      }
      if (deliverable === 'writtenReport') {
        internship.writtenReport.handedIn = true;
      }
      console.log(internship);
      $http.put('/api/internships/' + internship._id + '/deliverables', internship).success(successCallback);
      function successCallback(res) {
        alert('Success! internships updated.');
      }
    }
  }

}());
