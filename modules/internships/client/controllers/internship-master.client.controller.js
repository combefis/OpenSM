(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipMasterController', InternshipsController);

  InternshipsController.$inject = ['$scope', 'TeachersService', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, TeachersService, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship;

    vm.validateFirstVisit = validateFirstVisit;
    vm.validateIntermediateEvaluation = validateIntermediateEvaluation;
    vm.validateOralPresentation = validateOralPresentation;
    vm.masterPropositionCommentAdd = masterPropositionCommentAdd;
    vm.masterActivitiesNoteCommentAdd = masterActivitiesNoteCommentAdd;

    if (vm.internship.firstVisit.supervisorNotes.length === 0) {
      vm.internship.firstVisit.supervisorNotes.push({});
    }

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
        if (vm.authentication.user.roles.includes('master')) {
          vm.internship.firstVisit.masterValidation = true;
        } else if (vm.authentication.user.roles.includes('teacher')) {
          vm.internship.firstVisit.supervisorValidation = true;
          console.log(vm.internship.firstVisit);
        }
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
        vm.internship.oralPresentation.masterValidation = true;
        $http.put('/api/internships/' + vm.internship._id + '/editOralPresentation', vm.internship).success(successCallback);
      }
      function successCallback(res) {
        alert('Oral Presentation Updated!');
        $state.reload();
      }
    }

    function validateIntermediateEvaluation() {
      var confirmation = confirm('Warning! If you validate, you will no longer be able to add notes. Do you wish to continue?');
      if (confirmation === true) {
        vm.internship.intermediateEvaluation.masterValidation = true;
        $http.put('/api/internships/' + vm.internship._id + '/editIntermediateEvaluation', vm.internship).success(successCallback);
      }
      function successCallback(res) {
        alert('Intermediate Evaluation Updated!');
        $state.reload();
      }
    }

    function masterActivitiesNoteCommentAdd(isValid, decision) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipActivitiesNoteMasterCommentForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;
           // on envoie dans  <div class="form-group" show-errors>
      }

      vm.internship.activitiesNote.approval.masterApproval = decision;
      $http.put('/api/internships/' + vm.internship._id + '/editActivitiesNote', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('master')) {
          alert('Action registered!');
          $state.reload();
        }
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }

    function masterPropositionCommentAdd(isValid, decision) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipPropositionMasterCommentForm');
        return false;
      }
      vm.internship.proposition.approval.masterApproval = decision;
      $http.put('/api/internships/' + vm.internship._id + '/editProposition', vm.internship).success(successCallback);

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('master')) {
          alert('Action registered!');
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
