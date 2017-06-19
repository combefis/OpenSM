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
    vm.save = save;
    vm.authentication = Authentication;
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

    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipEnterpriseForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      $http.put('/api/internships/' + vm.internship._id + '/editEnterprise', vm.internship).success(successCallback);
      function successCallback(res) {
        if (vm.authentication.user.roles.includes('admin')) {
          alert('Enterprise info Updated!');
          $state.go('admin.manage.internships.list', {
            internshipId: res._id
          });
        } else if (vm.authentication.user.roles.includes('manager.internships')) {
          alert('Enterprise info Updated!');
          $state.go('manager.manage.internships.view', {
            internshipId: res._id
          });
        }
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }

  }
}());
