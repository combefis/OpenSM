(function () {
  'use strict';

  angular
  .module('internships')
  .controller('StudentsListController', StudentsListController);

  StudentsListController.$inject = ['StudentsService', 'InternshipsService'];


  function StudentsListController(StudentsService, InternshipsService) {
    var vm = this;
    vm.internships = InternshipsService.query({});  // il appelle(crer) le service et il fait query (ce qui appelle un GET dans le service)
    // vm.students = StudentsService.query();
  }

}());
