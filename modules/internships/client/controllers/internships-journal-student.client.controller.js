(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsStudentJournalController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.journalDate = new Date();
    vm.internship = internship; // le "resolve"
    vm.save = save;

    // Save Internship
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      $http.post('/api/internships/' + vm.internship._id + '/editJournal', {'date':vm.journalDate, 'note':vm.journalNote}).success(successCallback);

//changer dans html ng-bind: vm.journalDate
//changer le .success en .then (spécifique au post.. pour une raison mystérieuese.)

      function successCallback(res) {
        if (vm.authentication.user.roles.includes('admin')) {
          alert('Journal entry created!');
          $state.go('admin.manage.internships.list', {
            internshipId: res._id
          });
        } else if (vm.authentication.user.roles.includes('student')) {
          alert('Journal entry created!');
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
  }
}());
