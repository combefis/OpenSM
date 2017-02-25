(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsManagerTableController', InternshipsManagerTableController);

  InternshipsManagerTableController.$inject = ['$scope', '$state', '$window', 'Authentication', '$http', '$filter', 'InternshipsService'];

  function InternshipsManagerTableController($scope, $state, $window, Authentication, $http, filter, InternshipsService) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.internships = InternshipsService.query();  // il appelle(crer) le service et il fait query (ce qui appelle un GET dans le service)
  }

}());
