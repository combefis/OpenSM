(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http'];

  function InternshipsController($scope, $state, internship, $window, Authentication, http) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.internship = internship; // le "resolve"
    vm.save = save;
    vm.addGeneralObjective = addGeneralObjective;
    vm.addSpecificObjective = addSpecificObjective;
    vm.removeGeneralObjective = removeGeneralObjective;
    vm.removeSpecificObjective = removeSpecificObjective;

    if (!internship._id) {
      vm.internship.activitiesNote = {};
      vm.internship.activitiesNote.generalObjectives = [{}];
      vm.internship.activitiesNote.specificObjectives = [{}];
    }

    // Save Internship
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      console.log('coucou controleur');
      console.log(vm.internship);
      console.log('reoucoucou');
      // Create a new exam session, or update the current instance
      vm.internship.createOrUpdate()          // appel à la fonction dans le service
        .then(successCallback)
        .catch(errorCallback);


      function successCallback(res) {
/*        vm.internship.enterprise.name = '';                // on vide tous les champs du formulaireeeee
        vm.internship.enterprise.domain = '';

        vm.internship.enterprise.address.street = '';
        vm.internship.enterprise.address.number = '';
        vm.internship.enterprise.address.postalCode = '';
        vm.internship.enterprise.address.city = '';
        vm.internship.enterprise.address.country = '';

        vm.internship.enterprise.phonenumber = '';
        vm.internship.enterprise.fax = '';
        vm.internship.enterprise.mail = '';

        vm.internship.enterprise.representative.name = '';
        vm.internship.enterprise.representative.position = '';

        vm.internship.proposition.theme = '';
        vm.internship.proposition.domain = '';
        vm.internship.proposition.description.description = '';
        vm.internship.proposition.description.subjectApproval.consultedTeacher = '';

        vm.internship.master.firstname = '';
        vm.internship.master.lastname = '';
        vm.internship.master.position = '';
        vm.internship.master.phonenumber = '';
        vm.internship.master.mail = '';
*/
        console.log('all is good');
        $state.go('admin.manage.internships.list', {
          internshipId: res._id
        });
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }

    function addGeneralObjective() {
      console.log('coucou');
      vm.internship.activitiesNote.generalObjectives.push({});
    }

    function removeGeneralObjective(objective) {
      console.log('coucou');
      var index = vm.internship.activitiesNote.generalObjectives.indexOf(objective);
      vm.internship.activitiesNote.generalObjectives.splice(index, 1);
    }

    function addSpecificObjective() {
      console.log('coucou');
      vm.internship.activitiesNote.specificObjectives.push({});
    }

    function removeSpecificObjective(objective) {
      console.log('coucou');
      var index = vm.internship.activitiesNote.specificObjectives.indexOf(objective);
      vm.internship.activitiesNote.specificObjectives.splice(index, 1);
    }

  }
}());
