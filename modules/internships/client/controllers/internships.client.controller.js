(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship; // le "resolve"
    vm.save = save;
    vm.remove = remove;
    vm.enterpriseCreateOrUpdate = enterpriseCreateOrUpdate;
    vm.addGeneralObjective = addGeneralObjective;
    vm.addSpecificObjective = addSpecificObjective;
    vm.removeGeneralObjective = removeGeneralObjective;
    vm.removeSpecificObjective = removeSpecificObjective;
    vm.masterPropositionCommentAdd = masterPropositionCommentAdd;
    vm.masterActivitiesNoteCommentAdd = masterActivitiesNoteCommentAdd;
    vm.consultedTeacherPropositionCommentAdd = consultedTeacherPropositionCommentAdd;
    vm.supervisorDecision = supervisorDecision;
    vm.coordinatorPropositionCommentAdd = coordinatorPropositionCommentAdd;
    vm.addNoteField = addNoteField;

    if (vm.internship.firstVisit.supervisorNotes.length === 0) {
      console.log('uh-oh');
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

    function remove() {
      if ($window.confirm('Are you sure you want to delete this internship?')) {
        vm.internship.$remove({ _id: internship._id }, onSuccess, onError);
      }

      function onSuccess(internship) {
        $state.go('admin.manage.internships.list');
      }

      function onError(errorResponse) {
        var error = errorResponse.data;
      }
    }

    function enterpriseCreateOrUpdate() {
      if (!vm.internship.enterprise.modifications.createdOn) {
        vm.internship.enterprise.modifications.createdOn = Date.now();
      } else {
        vm.internship.enterprise.modifications.lastModification = Date.now();
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

    function addNoteField() {
      vm.internship.firstVisit.supervisorNotes.push({});
    }

    function masterActivitiesNoteCommentAdd(isValid, decision) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipActivitiesNoteMasterCommentForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;
           // on envoie dans  <div class="form-group" show-errors>
      }

      vm.internship.activitiesNote.approval = decision;
      $http.put('/api/internships/' + vm.internship._id + '/editActivitiesNote', vm.internship).success(successCallback);

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

    function masterPropositionCommentAdd(isValid, decision) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipPropositionMasterCommentForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;
           // on envoie dans  <div class="form-group" show-errors>
      }
      console.log(decision);
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
