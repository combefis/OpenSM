(function () {
  'use strict';

  angular
    .module('internships')
    .controller('MyInternshipsController', MyInternshipsController);

  MyInternshipsController.$inject = ['$scope', '$state', 'internshipResolve !a mettre dans la route', '$window', 'Authentication'];

  function ExamSessionsController($scope, $state, internship, $window, Authentication) {
    var vm = this;

    vm.internship = internship; //le "resolve" 
    vm.authentication = Authentication;
    vm.error = null;

    vm.form = {}; //init de la variable à vide.
    vm.save = save;

    // Convert start and end dates to Date objects
    // vm.examsession.start = vm.examsession.start ? new Date(vm.examsession.start) : null;
    // vm.examsession.end = vm.examsession.end ? new Date(vm.examsession.end) : null;

    // Save exam session
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.internshipForm');  //on envoie dans le scope (associé au controleur, et donc la page html)
        return false;   // on envoie dans  <div class="form-group" show-errors>
      }

      // Create a new exam session, or update the current instance
      vm.internship.createOrUpdate()          //appel à la fonction dans le service
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        // Clear form fields
        vm.internship.name = '';                //on vide tous les champs du formulaireeeee
        vm.internship.description = '';
        vm.internship.start = null;
        vm.internship.end = null;

        $state.go('admin.manage.examsessions.view', {
          examsessionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
