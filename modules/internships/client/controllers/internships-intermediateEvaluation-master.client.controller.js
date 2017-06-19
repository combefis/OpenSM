(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipIntermediateEvaluationMasterController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship; // le "resolve"
    vm.save = save;
    vm.addNoteField = addNoteField;
    vm.removeNoteField = removeNoteField;

    if (vm.internship.intermediateEvaluation.masterNotes.length === 0) {
      vm.internship.intermediateEvaluation.masterNotes.push({});
    }

    if (vm.internship.intermediateEvaluation.masterNotes.length === 0) {
      vm.internship.intermediateEvaluation.masterNotes.push({});
    }

    // Save Internship
    function addNoteField() {
      vm.internship.intermediateEvaluation.masterNotes.push({});
    }

    function removeNoteField(index) {
      vm.internship.intermediateEvaluation.masterNotes.splice(index, 1);
    }

    // Save Internship
    function save(isValid) {
      console.log(internship.intermediateEvaluation);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipIntermediateEvaluationForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        console.log('error');
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      $http.put('/api/internships/' + vm.internship._id + '/editIntermediateEvaluation', vm.internship).success(successCallback);

      function successCallback(res) {
        alert('Evaluations Updated!');
        $state.go('master.manage.students.internships.view', {
          internshipId: res._id
        });
      }

      function errorCallback(res) {
        console.log(res);
        vm.error = res.message.message;
      }
    }
  }
}());

