(function () {
  'use strict';

  angular
  .module('internships')
  .controller('MasterInternshipsListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', '$stateParams', 'InternshipsService', 'StudentsService', '$window', 'Authentication', '$http', '$filter'];


  function InternshipsListController($scope, $state, $stateParams, InternshipsService, StudentsService, $window, Authentication, http, filter) {
    var vm = this;

    vm.internships = InternshipsService.query({ studentId: $stateParams.studentId });  // il appelle(crer) le service et il fait query (ce qui appelle un GET dans le service)
    // comment choper le nom de l'étudiant???
    vm.studentId = $stateParams.studentId;
  }

}());
