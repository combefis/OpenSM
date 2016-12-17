(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http'];

  function InternshipsController($scope, $state, internship, $window, Authentication, http) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.internship = internship; // le "resolve"

    // Save Internship
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      // Create a new exam session, or update the current instance
      vm.internship.createOrUpdate()          // appel à la fonction dans le service
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        vm.internship.enterprise.name = '';                // on vide tous les champs du formulaireeeee
        vm.internship.enterprise.domain = '';

        vm.internship.enterprise.address.street = '';
        vm.internship.enterprise.address.number = '';
        vm.internship.enterprise.address.PostalCode = '';
        vm.internship.enterprise.address.City = '';
        vm.internship.enterprise.address.Country = '';

        vm.internship.enterprise.phonenumber = '';
        vm.internship.enterprise.Fax = '';
        vm.internship.enterprise.Mail = '';

        vm.internship.enterprise.Representative.Name = '';
        vm.internship.enterprise.Representative.Position = '';

        vm.internship.proposition.theme = '';
        vm.internship.proposition.domain = '';
        vm.internship.proposition.description.description = '';
        vm.internship.proposition.description.subjectApproval.consultedTeacher = '';

        vm.internship.master.firstname = '';
        vm.internship.master.lastname = '';
        vm.internship.master.position = '';
        vm.internship.master.phonenumber = '';
        vm.internship.master.mail = '';

        vm.internship.start = null;
        vm.internship.end = null;

        $state.go('student.manage.internships.list', {
          internshipId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  }
}());
