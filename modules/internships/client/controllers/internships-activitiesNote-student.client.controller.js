(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsStudentActivitiesNoteController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship; // le "resolve"
    vm.save = save;
    vm.addGeneralObjective = addGeneralObjective;
    vm.addSpecificObjective = addSpecificObjective;
    vm.removeGeneralObjective = removeGeneralObjective;
    vm.removeSpecificObjective = removeSpecificObjective;    

    // Save Internship
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.InternshipActivitiesNoteForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        console.log('error');
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      $http.put('/api/internships/' + vm.internship._id + '/editActivitiesNote', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('admin')) {
          alert('First Visit Updated!');
          $state.go('admin.manage.internships.list', {
            internshipId: res._id
          });
        } else if (vm.authentication.user.roles.includes('student')) {
          alert('First Visit Updated!');
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

    function addGeneralObjective() {
      vm.internship.activitiesNote.generalObjectives.push({});
    }

    function removeGeneralObjective(Gobjective) {
      var index = vm.internship.activitiesNote.generalObjectives.indexOf(Gobjective);
      vm.internship.activitiesNote.generalObjectives.splice(index, 1);
    }

    function addSpecificObjective(Gobjective) {
      var index = vm.internship.activitiesNote.generalObjectives.indexOf(Gobjective);
      console.log(index);
      if (typeof vm.internship.activitiesNote.generalObjectives[index].specificObjectives == 'undefined'){
        vm.internship.activitiesNote.generalObjectives[index].specificObjectives = [{}];
        return;
      }
      vm.internship.activitiesNote.generalObjectives[index].specificObjectives.push({});
    }

    function removeSpecificObjective(Gobjective, Sobjective) {
      var indexG = vm.internship.activitiesNote.generalObjectives.indexOf(Gobjective);
      var indexS = vm.internship.activitiesNote.generalObjectives[indexG].specificObjectives.indexOf(Sobjective);
      vm.internship.activitiesNote.generalObjectives[indexG].specificObjectives.splice(indexS, 1);
    }    
  }
}());
