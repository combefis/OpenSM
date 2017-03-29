(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsCoordinatorListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', 'InternshipsService', 'TeachersService', '$window', 'Authentication', '$http', '$filter'];


  function InternshipsListController($scope, $state, InternshipsService, TeachersService, $window, Authentication, $http, $filter) {
    var vm = this;
    vm.needCoordinatorApprovalList = new Array();
    vm.needOtherApprovalList = new Array();
    vm.attributeSupervisors = attributeSupervisors;

    vm.teachers = TeachersService.query(function(teachers) {
    });

    vm.internships = InternshipsService.query(function(internships) {
      console.log('sorting');
      internships.forEach(function(internship) {

        if (internship.generalStatus === 'Proposition Validation') {
          // if ((typeof internship.proposition.approval !== 'undefined') && (!internship.proposition.approval.coordinatorApproval)) {
          if ((typeof internship.proposition.approval === 'undefined') || (!internship.proposition.approval.coordinatorApproval)) {
            vm.needCoordinatorApprovalList.push(internship);
          }
          if ((typeof internship.proposition.approval === 'undefined') || (!internship.proposition.approval.consultedTeacherApproval) || (!internship.proposition.approval.masterApproval)) {
            vm.needOtherApprovalList.push(internship);
          }
        }
      });
      console.log('done sorting');

      vm.internships.forEach(function(internship) {
        if (internship.supervisor && internship.supervisor.proposedSupervisor && !internship.supervisor.supervisor) {
          internship.supervisor.supervisor = internship.supervisor.proposedSupervisor;
        } else {
          console.log("no prop");
        }
      });
    });

    function attributeSupervisors() {

      $http.put('/api/internships/supervisors', { 'internships': vm.internships }).success(successCallback);

      function successCallback(res) {
        alert('Success! internships updated.');
        // location.reload();
        // $state.go('coordinator.manage.internships.list');
      }
    }
  }
}());
