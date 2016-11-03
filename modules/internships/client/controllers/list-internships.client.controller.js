(function () {
  'use strict';

  angular
    .module('internships')
	.controller('InternshipsListController', InternshipsListController)
	.controller('MyInternshipsListController', MyInternshipsListController);


  InternshipsListController.$inject = ['InternshipsService'];
  MyInternshipsListController.$inject = ['MyInternshipsService'];


  function InternshipsListController(InternshipsService) {
    var vm = this;

    vm.internships = InternshipsService.query();
  }


  function MyInternshipsListController(MyInternshipsService) {
    var vm = this;

    vm.myInternships = MyInternshipsService.query();
  }


}());
