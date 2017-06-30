(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsValidatorListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', 'InternshipsService', 'TeachersService', '$window', 'Authentication', '$http', '$filter', '$rootScope'];

  function InternshipsListController($scope, $state, InternshipsService, TeachersService, $window, Authentication, $http, $filter, $rootScope) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer
    vm.teachers = TeachersService.query(function(teachers) {});
    vm.updateSelection = updateSelection;
    vm.attributeSupervisors = attributeSupervisors;
    vm.validateInternships = validateInternships;
    vm.selectAllSupervisor = selectAllSupervisor;
    vm.selectAllValidation = selectAllValidation;
    vm.allManagerValidated = false;
    vm.filterSelect = 'All';
    vm.filterSelect = 'view all';
    vm.filterOptions = ['view all', 'supervisors', 'ready for validation'];

    vm.internships = InternshipsService.query(function(internships) {
      vm.allManagerValidated = internships.every(function(internship) {return internship.managerApproval;});
      if (internships.every(function(internship) {
        return ((typeof internship.supervisor !== 'undefined') && (internship.supervisor.supervisor));
      })) {
        vm.filterOptions.splice(vm.filterOptions.indexOf('supervisor'), 1);
      }

      vm.readyList = internships.filter(function(internship) { return internship.generalStatus === 'Validation';});
      if (vm.readyList.length <= 0) {vm.filterOptions.splice(vm.filterOptions.indexOf('ready for validation'), 1);}

      internships.forEach(function(internship) {
        if (!internship.supervisor || !internship.supervisor.supervisor) {
          internship.noSupervisor = true;
        }
        internships.forEach(function(internship) {
          if ((!internship.supervisor) || ((!internship.supervisor.supervisor)) && (!internship.supervisor.proposedSupervisor)) {
            internship.supervisorText = "no supervisor or proposition";
          }
          if ((internship.supervisor) && (internship.supervisor.supervisor)) {
            internship.supervisorText = internship.supervisor.supervisor.username;
          } else if ((internship.supervisor) && (internship.supervisor.proposedSupervisor)) {
            // internship.supervisor.supervisor = internship.supervisor.proposedSupervisor;
            internship.supervisorText = internship.supervisor.proposedSupervisor.username + ' (proposed) ';
          }
        });
      });
    });

    if ($scope.internships) {
      vm.internships = $scope.internships;
    }

    function updateSelection(internship) {
      $rootScope.internships = vm.internships;
      console.log($rootScope.internships);
    }

    function validateInternships() {
      var internshipsCheckedList = [];
      vm.internships.forEach(function(internship) {
        if (internship.valCheck === true) {
          internship.validatorApproval = true;
          internshipsCheckedList.push(internship);
          console.log(internshipsCheckedList);
        }
      });
      if (internshipsCheckedList.length > 0) {
        $http.put('/api/internships/validation', { 'internships': internshipsCheckedList }).success(successCallback);
      }
      function successCallback(res) {
        alert('Success! internships updated.');
      // location.reload();
      // $state.go('coordinator.manage.internships.list');
      }
    }

    function attributeSupervisors() {
      var internshipsCheckedList = [];
      vm.internships.forEach(function(internship) {
        if (internship.supCheck === true) {
          internshipsCheckedList.push(internship);
        }
      });

      if (internshipsCheckedList.length > 0) {
        $http.put('/api/internships/supervisors', { 'internships': internshipsCheckedList }).success(successCallback);
      }
      function successCallback(res) {
        alert('Success! internships updated.');
      // location.reload();
      // $state.go('coordinator.manage.internships.list');
      }
    }

    function selectAllValidation() {
      console.log('selectAll');
      vm.readyList.forEach(function(internship) {
        internship.valCheck = vm.checkSelectAllVal;
      });
    }
    function selectAllSupervisor() {
      console.log('selectAll');
      vm.internships.forEach(function(internship) {
        if (((!internship.supervisor) || (!internship.supervisor.supervisor)) && (!internship.managerApproval)) {
          internship.supCheck = vm.checkSelectAllSup;
        }
      });
    }
  }

}());
