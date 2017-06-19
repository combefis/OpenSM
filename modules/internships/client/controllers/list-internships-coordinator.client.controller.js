(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsCoordinatorListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', 'InternshipsService', 'TeachersService', '$window', 'Authentication', '$http', '$filter', '$rootScope'];


  function InternshipsListController($scope, $state, InternshipsService, TeachersService, $window, Authentication, $http, $filter, $rootScope) {
    var vm = this;
    vm.needCoordinatorApprovalList = new Array();
    vm.needOtherApprovalList = new Array();
    vm.attributeSupervisors = attributeSupervisors;
    vm.updateSelection = updateSelection;
    vm.selectAll = selectAll;

    vm.teachers = TeachersService.query(function(teachers) {});

    vm.internships = InternshipsService.query(function(internships) {
      console.log('sorting');
      internships.forEach(function(internship) {
        if ((internship.generalStatus === 'Proposition Validation') || (internship.generalStatus === 'Proposition Revalidation')) {
          if ((typeof internship.proposition.approval === 'undefined') || (internship.proposition.approval.coordinatorApproval === null)) {
            vm.needCoordinatorApprovalList.push(internship);
          }
          if (typeof internship.proposition.approval === 'undefined' || !internship.proposition.approval.consultedTeacherApproval || internship.proposition.approval.consultedTeacherApproval === false || !internship.proposition.approval.masterApproval || internship.proposition.approval.masterApproval === false) {
            vm.needOtherApprovalList.push(internship);
          }
        }
      });

      internships.forEach(function(internship) {
        if (!internship.supervisor || !internship.supervisor.supervisor) {
          internship.noSupervisor = true;
        }
        internships.forEach(function(internship) {
          if ((!internship.supervisor) || ((!internship.supervisor.supervisor)) && (!internship.supervisor.proposedSupervisor)) {
            internship.supervisorText = 'no supervisor or proposition';
          }
          if ((internship.supervisor) && (internship.supervisor.supervisor)) {
            internship.supervisorText = internship.supervisor.supervisor.username;
          } else if ((internship.supervisor) && (internship.supervisor.proposedSupervisor)) {
            internship.supervisor.supervisor = internship.supervisor.proposedSupervisor;
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

    function attributeSupervisors() {

      var internshipsCheckedList = [];

      vm.internships.forEach(function(internship) {
        console.log("test");
        if (internship.check === true) {
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

    function selectAll() {
      console.log('selectAll');
      vm.internships.forEach(function(internship) {
        if (internship.noSupervisor) {
          internship.check = vm.checkSelectAll;
        }
      });
    }
  }
}());
