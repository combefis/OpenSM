(function () {
  'use strict';

  angular
  .module('internships')
  .controller('StudentsListController', StudentsListController);

  StudentsListController.$inject = ['StudentsService', 'InternshipsService', '$rootScope'];


  function StudentsListController(StudentsService, InternshipsService, $rootScope) {
    var vm = this;
    vm.internships = [];
    vm.nameArray = [];

    vm.internships = InternshipsService.query(function(internships) {

      console.log(internships);

      internships.forEach(function(internship) {
        console.log('test');
        if (vm.nameArray.includes(internship.student._id)) {
          console.log('pop');
          var index = internships.indexOf(internship);
          console.log(index);
          internships.splice(index, 1);
          // internships.pop(internship);

        } else {
          vm.nameArray.push(internship.student._id);
          console.log('add to array');
        }
      });

      console.log(vm.internships);
      console.log(vm.nameArray);
      return internships;

    });
  }

}());
