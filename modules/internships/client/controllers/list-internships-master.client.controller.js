(function () {
  'use strict';

  angular
  .module('internships')
  .controller('MasterInternshipsListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', '$stateParams', 'InternshipsService', 'StudentsService', '$window', 'Authentication', '$http', '$filter', '$rootScope'];


  function InternshipsListController($scope, $state, $stateParams, InternshipsService, StudentsService, $window, Authentication, $http, filter, $rootScope) {
    var vm = this;

    vm.internships = InternshipsService.query({ studentId: $stateParams.studentId }, function(internships) {
      vm.student = internships[0].student;
    });
  }

}());
