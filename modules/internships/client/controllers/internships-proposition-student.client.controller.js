(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsStudentPropositionController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter', 'TeachersService'];

  function InternshipsController($scope, $state, internship, $window, Authentication, $http, filter, TeachersService) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship; // le "resolve"
    vm.save = save;

    vm.teachers = TeachersService.query(function(teachers) {
    });

    $http.get('/api/masters').success(function(masters) {
      vm.masters = masters;
    });

    console.log(vm.internship.master);
    console.log(vm.internship.consultedTeacher);

    // Save Internship
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipPropositionForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        console.log('error');
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }
      console.log(vm.internship);
      $http.put('/api/internships/' + vm.internship._id + '/editProposition', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('admin')) {
          alert('Proposition Updated!');
          $state.go('admin.manage.internships.list', {
            internshipId: res._id
          });
        } else if (vm.authentication.user.roles.includes('student')) {
          alert('Proposition Updated!');
          $state.go('student.manage.internships.view', {
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
