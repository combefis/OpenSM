(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsCoordinatorListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', 'InternshipsService', '$window', 'Authentication', '$http', '$filter'];


  function InternshipsListController($scope, $state, InternshipsService, $window, Authentication, http, filter) {
    var vm = this;
    vm.sort = sort;
    vm.needCoordinatorApprovalList = new Array();
    vm.needOtherApprovalList = new Array();

    vm.internships = InternshipsService.query(function(internships) {
      console.log('sorting');
      internships.forEach(function(internship) {

        if (internship.generalStatus === 'Proposition Validation') {
          // if ((typeof internship.proposition.approval !== 'undefined') && (!internship.proposition.approval.coordinatorApproval)) {
          if ((typeof internship.proposition.approval === 'undefined') || (!internship.proposition.approval.coordinatorApproval)) {
            vm.needCoordinatorApprovalList.push(internship);
          } else {
            vm.needOtherApprovalList.push(internship);
          }
        }
      });
      console.log('done sorting');
    });

    function sort(internship) {
      console.log('coucou');
    }
  }
}());
