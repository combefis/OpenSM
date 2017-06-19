(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsController', InternshipsController);

  InternshipsController.$inject = ['$scope', 'TeachersService', 'StudentsService', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, TeachersService, StudentsService, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.open = open;
    vm.internship = internship;
    vm.filterOptions = ['Enterprise Encoding', 'Proposition Encoding', 'Proposition Reincoding', 'Proposition Validation', 'Proposition Revalidation', 'Supervisor Attribution', 'Validation', 'Activities Note Encoding', 'Activities Note Reincoding', 'Activities Note Validation', 'Internship', 'First Visit', 'Intermediate Evaluation', 'Oral Presentation', 'Final Delivery'];

    if (!vm.internship.deadlines) {vm.internship.deadlines = {};}
    if (vm.internship.deadlines.startInternship) {
      vm.internship.deadlines.startInternship = new Date(vm.internship.deadlines.startInternship);
    }
    if (vm.internship.deadlines.endInternship) {
      vm.internship.deadlines.endInternship = new Date(vm.internship.deadlines.endInternship);
    }
    vm.internship.startPopup = { opened: false };
    vm.internship.endPopup = { opened: false };
    vm.popup1 = { opened: false };
    vm.popup2 = { opened: false };

    if (vm.internship.firstVisit.date) {
      vm.internship.firstVisit.date = new Date(internship.firstVisit.date);
    }

    if (vm.internship.oralPresentation.date) {
      vm.internship.oralPresentation.date = new Date(vm.internship.oralPresentation.date);
    }

    vm.save = save;
    vm.remove = remove;
    vm.enterpriseCreateOrUpdate = enterpriseCreateOrUpdate;
    vm.validateFirstVisit = validateFirstVisit;
    vm.addGeneralObjective = addGeneralObjective;
    vm.addSpecificObjective = addSpecificObjective;
    vm.removeGeneralObjective = removeGeneralObjective;
    vm.removeSpecificObjective = removeSpecificObjective;
    vm.masterPropositionCommentAdd = masterPropositionCommentAdd;
    vm.masterActivitiesNoteCommentAdd = masterActivitiesNoteCommentAdd;
    vm.consultedTeacherPropositionCommentAdd = consultedTeacherPropositionCommentAdd;
    vm.supervisorActivitiesNoteCommentAdd = supervisorActivitiesNoteCommentAdd;
    vm.supervisorDecision = supervisorDecision;
    vm.coordinatorPropositionCommentAdd = coordinatorPropositionCommentAdd;
    vm.addNoteField = addNoteField;
    vm.removeVisitNoteField = removeVisitNoteField;
    vm.addVisitNoteField = addVisitNoteField;
    vm.addOralNoteField = addOralNoteField;
    vm.removeOralNoteField = removeOralNoteField;

    vm.teachers = TeachersService.query(function(teachers) {});
    vm.students = StudentsService.query(function(students) {});

    $http.get('/api/masters').success(function(masters) {
      vm.masters = masters;
    });

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
        }
        $http.put('/api/internships/' + vm.internship._id + '/editFirstVisit', vm.internship).success(successCallback);
      }
      function successCallback(res) {
        alert('First Visit Updated!');
        $state.reload();
      }
    }

    // Save Internship
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        console.log('errors');
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      if (vm.internship.deadlines.startInternship) {
        vm.internship.deadlines.startInternship = new Date(vm.internship.deadlines.startInternship);
      }

      console.log(vm.internship.deadlines.startInternship);
      console.log(vm.internship.deadlines.endInternship);

      vm.internship.createOrUpdate()
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

    function addSpecificObjective(Gobjective) {
      var index = vm.internship.activitiesNote.generalObjectives.indexOf(Gobjective);
      console.log(index);
      if (typeof vm.internship.activitiesNote.generalObjectives[index].specificObjectives == 'undefined') {
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

    function addNoteField() {
      vm.internship.firstVisit.supervisorNotes.push({});
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

    vm.format = 'yyyy/MM/dd';
    vm.inlineOptions = {
      minDate: new Date(),
      showWeeks: true
    };
    vm.dateOptions = {
      dateDisabled: 'disabled',
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    function open(internship, popup, target) {
      if (!internship.deadlines) { internship.deadlines = {};}
      internship.deadlines[target] = new Date();
      internship[popup].opened = true;
    }

    vm.open1 = function() {
      vm.internship.firstVisit.date = new Date();
      vm.popup1.opened = true;
    };

    vm.open2 = function() {
      vm.internship.oralPresentation.date = new Date();
      vm.popup2.opened = true;
    };

    vm.setDate = function(year, month, day) {
      vm.internship.firstVisit.date = new Date(year, month, day);
    };

    vm.setOralDate = function(year, month, day) {
      vm.internship.oralPresentation.date = new Date(year, month, day);
    };

    function addVisitNoteField(role) {
      if (role === 'teacher') {
        vm.internship.firstVisit.supervisorNotes.push({});
      }
      if (role === 'master') {
        vm.internship.firstVisit.masterNotes.push({});
      }
    }

    function removeVisitNoteField(index, role) {
      if (role === 'teacher') {
        vm.internship.firstVisit.supervisorNotes.splice(index, 1);
      }
      if (role === 'master') {
        vm.internship.firstVisit.masterNotes.splice(index, 1);
      }
    }

    function addOralNoteField(role) {
      if (role === 'teacher') {
        vm.internship.oralPresentation.supervisorNotes.push({});
      }
      if (role === 'master') {
        vm.internship.oralPresentation.masterNotes.push({});
      }
    }

    function removeOralNoteField(index, role) {
      if (role === 'teacher') {
        vm.internship.oralPresentation.supervisorNotes.splice(index, 1);
      }
      if (role === 'master') {
        vm.internship.oralPresentation.masterNotes.splice(index, 1);
      }
    }
  }
}());
