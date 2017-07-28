(function() {
  'use strict';

  angular
    .module('companies.admin')
    .controller('CompaniesListAdminController', CompaniesListAdminController);

  CompaniesListAdminController.$inject = ['CompaniesService'];

  function CompaniesListAdminController (CompaniesService) {
    var vm = this;

    vm.companies = CompaniesService.query();
  }
}());
