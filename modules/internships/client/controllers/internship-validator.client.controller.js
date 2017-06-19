(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipValidatorController', InternshipsController);

  InternshipsController.$inject = ['$scope', 'TeachersService', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, TeachersService, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship;
    vm.save = save;
    vm.attributeSupervisor = attributeSupervisor;
    vm.teachers = TeachersService.query(function(teachers) {});

    if (vm.internship.firstVisit.supervisorNotes.length === 0) {
      vm.internship.firstVisit.supervisorNotes.push({});
    }

    if (vm.internship.oralPresentation.supervisorNotes.length === 0) {
      vm.internship.oralPresentation.supervisorNotes.push({});
    }

    if (internship.proposition && !internship.proposition.approval) {
      internship.proposition.approval = {};
    }

    if (!internship._id) {
      vm.internship.activitiesNote = {};
      vm.internship.activitiesNote.generalObjectives = [{}];
      vm.internship.activitiesNote.specificObjectives = [{}];
    }

    function attributeSupervisor() {

      console.log(vm.internship.supervisor.supervisor);

      $http.put('/api/internships/' + vm.internship._id + '/editSupervisor', vm.internship).success(successCallback);

      function successCallback(res) {
        alert('Success! Internship updated.');
        $state.reload();
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }

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
        if (vm.authentication.user.roles.includes('admin')) {
          $state.go('admin.manage.internships.list', {
            internshipId: res._id
          });
        } else if (vm.authentication.user.roles.includes('student')) {
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

    function supervisorActivitiesNoteCommentAdd(isValid, decision) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipActivitiesNoteSupervisorCommentForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;
           // on envoie dans  <div class="form-group" show-errors>
      }

      vm.internship.activitiesNote.approval.supervisorApproval = decision;
      $http.put('/api/internships/' + vm.internship._id + '/editActivitiesNote', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('teacher')) {
          alert('Action registered!');
          $state.go('teacher.manage.internships.view', {
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
