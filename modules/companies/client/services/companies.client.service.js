(function() {
  'use strict';

  angular
    .module('companies.services')
    .factory('CompaniesService', CompaniesService);

  CompaniesService.$inject = ['$resource', '$log'];

  function CompaniesService ($resource, $log) {
    var Company = $resource('/api/companies/:companyId', {
      companyId: ''
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Company.prototype, {
      createOrUpdate: function() {
        var company = this;
        return createOrUpdate(company);
      }
    });

    return Company;

    function createOrUpdate (company) {
      if (company._id) {
        return company.$update({ companyId: company._id }, onSuccess, onError);
      }
      return company.$save(onSuccess, onError);

      // Handle successful response
      function onSuccess (company) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError (errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError (error) {
      // Log error
      $log.error(error);
    }
  }
}());
