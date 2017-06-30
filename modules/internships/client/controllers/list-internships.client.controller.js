(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsListAdminController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'InternshipsService', 'TeachersService', '$window', 'Authentication', '$http', '$filter', '$rootScope', 'internshipResolve'];


  function InternshipsController ($scope, $state, InternshipsService, TeachersService, $window, Authentication, $http, $filter, $rootScope, internship) {
    var vm = this;

    vm.internships = InternshipsService.query();  // il appelle(crer) le service et il fait query (ce qui appelle un GET dans le service)
    vm.internship = internship;
    vm.createNew = createNew;

    console.log('enter');

    function createNew() {

      vm.internship.createOrUpdate()          // appel à la fonction dans le service
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        console.log('all is good');
        vm.internships = InternshipsService.query();
        console.log(vm.internship._id);
        $state.go("admin.manage.internships.view", { internshipId: vm.internship._id });
        // delete vm.internship._id;
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }
  }

}());
