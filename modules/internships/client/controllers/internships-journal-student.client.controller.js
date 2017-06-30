(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsStudentJournalController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer
    vm.save = save;
    vm.authentication = Authentication;
    vm.internship = internship;

    var today = new Date;
    today = [today.getDate(), today.getMonth(), today.getFullYear()];

    vm.journalEntry = {
      'date': new Date,
      'note': ''
    };

    vm.internship.journal.entries.forEach(function(entry) {
      var journalDate = new Date(entry.date);
      journalDate = [journalDate.getDate(), journalDate.getMonth(), journalDate.getFullYear()];
      if (journalDate.toString() === today.toString()) {
        entry.date = new Date(entry.date);
        vm.journalEntry = entry;
      }
    });

    // Save Internship
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipJournalForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        console.log('error');
        return false;   // on envoie dans  <div class="form-group" show-errors>

      }

      $http.post('/api/internships/' + vm.internship._id + '/editJournal', { 'date': vm.journalEntry.date, 'note': vm.journalEntry.note }).success(successCallback);

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
