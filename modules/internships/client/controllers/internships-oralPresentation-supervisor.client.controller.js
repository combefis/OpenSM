(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipOralPresentationController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship; // le "resolve"
    vm.save = save;
    vm.addNoteField = addNoteField;
    vm.removeNoteField = removeNoteField;

    if (vm.internship.oralPresentation.supervisorNotes.length === 0) {
      vm.internship.oralPresentation.supervisorNotes.push({});
    }

    if (vm.internship.oralPresentation.masterNotes.length === 0) {
      vm.internship.oralPresentation.masterNotes.push({});
    }

    // Save Internship
    function addNoteField() {
      if (vm.authentication.user.roles.includes('teacher')) {
        vm.internship.oralPresentation.supervisorNotes.push({});
      }
      if (vm.authentication.user.roles.includes('master')) {
        vm.internship.oralPresentation.masterNotes.push({});
      }
    }

    function removeNoteField(index) {
      if (vm.authentication.user.roles.includes('teacher')) {
        vm.internship.oralPresentation.supervisorNotes.splice(index, 1);
      }
      if (vm.authentication.user.roles.includes('master')) {
        vm.internship.oralPresentation.masterNotes.splice(index, 1);
      }
    }

    // Save Internship
    function save(isValid) {
      console.log(internship.oralPresentation);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipOralPresentationForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        console.log('error');
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      $http.put('/api/internships/' + vm.internship._id + '/editOralPresentation', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('admin')) {
          alert('First Visit Updated!');
          $state.go('admin.manage.internships.list', {
            internshipId: res._id
          });
        } else if (vm.authentication.user.roles.includes('teacher')) {
          alert('First Visit Updated!');
          $state.go('teacher.manage.internships.view', {
            internshipId: res._id
          });
        } else if (vm.authentication.user.roles.includes('master')) {
          alert('First Visit Updated!');
          $state.go('master.manage.students.internships.view', {
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

