(function () {
  'use strict';

  angular
    .module('examsessions')
    .controller('ExamSessionsController', ExamSessionsController);

  ExamSessionsController.$inject = ['$scope', '$state', 'examsessionResolve', '$window', 'Authentication'];

  function ExamSessionsController($scope, $state, examsession, $window, Authentication) {
    var vm = this;

    vm.examsession = examsession;
    vm.authentication = Authentication;
    vm.filterExam = filterExam;
    vm.showMyExams = vm.authentication.user.roles.includes('teacher');

    function filterExam (exam) {
      return !vm.showMyExams || exam.course.team.some(function (element) {
        return element.username === vm.authentication.user.username;
      });
    }
  }
}());
