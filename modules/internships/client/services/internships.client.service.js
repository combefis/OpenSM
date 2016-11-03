(function () {
  'use strict';

  angular
    .module('internships.services')
    .factory('InternshipsService', InternshipsService)
    .factory('MyInternshipsService', MyInternshipsService);

  InternshipsService.$inject = ['$resource'];
  MyInternshipsService.$inject = ['$resource'];

  function InternshipsService($resource) {
    var Internships = $resource('api/internships');

    return Internships;
  }


  function MyInternshipsService($resource) {
    var MyInternships = $resource('api/myinternships');

    return MyInternships;
  }

}());
