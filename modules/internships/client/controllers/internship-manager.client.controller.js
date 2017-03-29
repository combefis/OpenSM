(function () {
  'use strict';

  angular
  .module('internships')
  .controller('InternshipsManagerController', InternshipsManagerController);

  InternshipsManagerController.$inject = ['$scope', '$state', 'internshipResolve', 'TeachersService', '$window', 'Authentication', '$http', '$filter'];


  function InternshipsManagerController($scope, $state, Internship, TeachersService, $window, Authentication, $http, $filter) {

    var vm = this;
    vm.internship = Internship;
    vm.attributeSupervisor = attributeSupervisor;
    vm.teachers = TeachersService.query(function(teachers) {
    });

    function attributeSupervisor() {

      console.log(vm.internship.supervisor.supervisor);

      $http.put('/api/internships/' + vm.internship._id + '/editSupervisor', vm.internship).success(successCallback);

      function successCallback(res) {
        alert('Success! Internship updated.');
        $state.go('manager.manage.internships.list', {
          internshipId: res._id
        });
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }
  }
}());
