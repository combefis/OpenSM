(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsTeacherListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', 'InternshipsService', '$window', 'Authentication', '$http', '$filter'];


  function InternshipsListController($scope, $state, InternshipsService, $window, Authentication, http, filter) {
    var vm = this;
    vm.sort = sort;
    vm.subjetApprovalDemands = new Array();
    vm.supervisorDemands = new Array();
    vm.myInternships = new Array();


    vm.internships = InternshipsService.query(function(internships) {
      console.log('sorting');
      internships.forEach(function(internship) {
        if ((typeof internship.consultedTeacher !== 'undefined') && (internship.consultedTeacher.username === Authentication.user.username)) {
          vm.subjetApprovalDemands.push(internship);
        }

        if ((typeof internship.supervisor !== 'undefined') && (typeof internship.supervisor.proposedSupervisor !== 'undefined') && (internship.supervisor.proposedSupervisor.username === Authentication.user.username)) {

          if (internship.supervisor.attributed === true) {
            vm.myInternships.push(internship);
          } else {

            vm.supervisorDemands.push(internship);
          }
        }
      });
      console.log("done sorting");
    });

    function sort(internship) {
      console.log('coucou');
    }
  }
}());
