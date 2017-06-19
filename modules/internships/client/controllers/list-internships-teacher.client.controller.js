(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsTeacherListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', 'InternshipsService', '$window', 'Authentication', '$http', '$filter'];


  function InternshipsListController($scope, $state, InternshipsService, $window, Authentication, http, filter) {
    var vm = this;
    vm.subjetApprovalDemands = new Array();
    vm.supervisorDemands = new Array();
    vm.myInternships = new Array();


    vm.internships = InternshipsService.query(function(internships) {
      console.log('sorting');
      internships.forEach(function(internship) {
        if ((typeof internship.consultedTeacher !== 'undefined') && (internship.consultedTeacher.username === Authentication.user.username)) {
          if (internship.proposition.approval.consultedTeacherApproval === null) {
            vm.subjetApprovalDemands.push(internship);
          }
        }

        if (internship.supervisor && ((internship.supervisor.proposedSupervisor) || (internship.supervisor.supervisor))) {
          if ((internship.supervisor.proposedSupervisor) && (internship.supervisor.proposedSupervisor.username === Authentication.user.username)) {
            if ((!internship.managerApproval) && ((internship.supervisor.propositionResponse === null) || (internship.supervisor.propositionResponse))) {
              vm.supervisorDemands.push(internship);
            }
          }
          console.log(internship);
          if (internship.supervisor.supervisor && (internship.supervisor.supervisor.username === Authentication.user.username) && (internship.managerApproval)) {
            vm.myInternships.push(internship);
          }
        }

      });
      console.log("done sorting");
    });
  }
}());
