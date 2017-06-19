(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipCoordinatorController', InternshipsController);

  InternshipsController.$inject = ['$scope', 'TeachersService', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, TeachersService, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship;
    vm.coordinatorPropositionCommentAdd = coordinatorPropositionCommentAdd;

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
  }
}());
