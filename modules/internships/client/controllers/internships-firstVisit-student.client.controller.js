(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsStudentFirstVisitController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', '$http', '$filter'];

  function InternshipsController($scope, $state, internship, $window, Authentication, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship; // le "resolve"
    vm.save = save;

    if (!vm.internship.firstVisit || !vm.internship.firstVisit.date) {
      vm.internship.firstVisit = {};
    } else if (typeof vm.internship.firstVisit != 'undefined') {
      vm.internship.firstVisit.date = new Date(internship.firstVisit.date);
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

    vm.open1 = function() {
      vm.internship.firstVisit.date = new Date();
      vm.popup1.opened = true;
    };

    vm.setDate = function(year, month, day) {
      vm.internship.firstVisit.date = new Date(year, month, day);
    };

    vm.popup1 = {
      opened: false
    };

    // Save Internship
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipFirstVisitForm');  // on envoie dans le scope (associé au controleur, et donc la page html)
        console.log('error');
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      $http.put('/api/internships/' + vm.internship._id + '/editFirstVisit', vm.internship).success(successCallback);

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
  }
}());
