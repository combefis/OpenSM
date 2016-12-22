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
      vm.internship.activitiesNote.generalObjectives.push({});
    }

    function removeGeneralObjective(Gobjective) {
      var index = vm.internship.activitiesNote.generalObjectives.indexOf(Gobjective);
      vm.internship.activitiesNote.generalObjectives.splice(index, 1);
    }

    function addSpecificObjective() {
      vm.internship.activitiesNote.specificObjectives.push({});
    }

    function removeSpecificObjective(Sobjective) {
      var index = vm.internship.activitiesNote.specificObjectives.indexOf(Sobjective);
      console.log(index);
      vm.internship.activitiesNote.specificObjectives.splice(index, 1);
    }

  }
}());
