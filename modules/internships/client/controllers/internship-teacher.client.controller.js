(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipTeacherController', InternshipsController);

  InternshipsController.$inject = ['$scope', 'TeachersService', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, TeachersService, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship;
    vm.save = save;

    vm.validateFirstVisit = validateFirstVisit;
    vm.validateOralPresentation = validateOralPresentation;
    vm.consultedTeacherPropositionCommentAdd = consultedTeacherPropositionCommentAdd;
    vm.supervisorActivitiesNoteCommentAdd = supervisorActivitiesNoteCommentAdd;
    vm.supervisorDecision = supervisorDecision;
    vm.coordinatorPropositionCommentAdd = coordinatorPropositionCommentAdd;
    vm.addNoteField = addNoteField;

/*    if (vm.internship.firstVisit.supervisorNotes.length === 0) {
      vm.internship.firstVisit.supervisorNotes.push({});
    } */

    if (internship.proposition && !internship.proposition.approval) {
      internship.proposition.approval = {};
    }

    if (!internship._id) {
      vm.internship.activitiesNote = {};
      vm.internship.activitiesNote.generalObjectives = [{}];
      vm.internship.activitiesNote.specificObjectives = [{}];
    }

    function validateFirstVisit() {
      var confirmation = confirm('Warning! If you validate, you will no longer be able to add notes. Do you wish to continue?');
      if (confirmation === true) {
        vm.internship.firstVisit.supervisorValidation = true;
        $http.put('/api/internships/' + vm.internship._id + '/editFirstVisit', vm.internship).success(successCallback);
      }
      function successCallback(res) {
        alert('First Visit Updated!');
        $state.reload();
      }
    }

    function validateOralPresentation() {
      var confirmation = confirm('Warning! If you validate, you will no longer be able to add notes. Do you wish to continue?');
      if (confirmation === true) {
        vm.internship.oralPresentation.supervisorValidation = true;
        $http.put('/api/internships/' + vm.internship._id + '/editOralPresentation', vm.internship).success(successCallback);
      }
      function successCallback(res) {
        alert('Oral Presentation Updated!');
        $state.reload();
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
        alert('succes!');
        $state.reload();
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }

    function addNoteField() {
      vm.internship.firstVisit.supervisorNotes.push({});
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

    function consultedTeacherPropositionCommentAdd(isValid, decision) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipPropositionConsultedTeacherCommentForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;
           // on envoie dans  <div class="form-group" show-errors>
      }
      vm.internship.proposition.approval.consultedTeacherApproval = decision;
      $http.put('/api/internships/' + vm.internship._id + '/editProposition', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('teacher')) {
          alert('Action registered!');
          $state.go('teacher.manage.internships.subjectApproval', {
            internshipId: res._id
          });
        }
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }

    function coordinatorPropositionCommentAdd(isValid, decision) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipPropositionCoordinatorCommentForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;
      }

      vm.internship.proposition.approval.coordinatorApproval = decision;
      $http.put('/api/internships/' + vm.internship._id + '/editProposition', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('coordinator')) {
          alert('Action registered!');
          $state.go('coordinator.manage.internships.list', {
            internshipId: res._id
          });
        }
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }

    function supervisorDecision(isValid, response) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipSupervisorPropositionForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;
      }

      console.log(response);
      vm.internship.supervisor.propositionResponse = response;
      $http.put('/api/internships/' + vm.internship._id + '/editSupervisor', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('teacher')) {
          alert('Action registered!');
          $state.go('teacher.manage.internships.list', {
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
