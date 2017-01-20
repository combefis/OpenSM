(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsListController', InternshipsListController);

  InternshipsListController.$inject = ['InternshipsService'];


  function InternshipsListController(InternshipsService) {
    var vm = this;

    vm.internships = InternshipsService.query();  // il appelle(crer) le service et il fait query (ce qui appelle un GET dans le service)
  }

}());
