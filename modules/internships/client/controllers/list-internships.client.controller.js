(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsListController', InternshipsListController);

  InternshipsListController.$inject = ['$scope', '$state', 'InternshipsService', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];


  function InternshipsListController($scope, $state, InternshipsService, internship, $window, Authentication, http, filter) {
    var vm = this;

    vm.internships = InternshipsService.query();  // il appelle(crer) le service et il fait query (ce qui appelle un GET dans le service)
    vm.createNew = createNew;
    vm.internship = internship;

    console.log('enter');

    function createNew() {

      vm.internship.createOrUpdate()          // appel à la fonction dans le service
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        console.log('all is good');
        vm.internships = InternshipsService.query();
        delete vm.internship._id;
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }
  }

}());
