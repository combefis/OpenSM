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
  }
}());
