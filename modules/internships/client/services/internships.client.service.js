(function () {
  'use strict';

  angular
    .module('internships.services')
    .factory('InternshipsService', InternshipsService);

  InternshipsService.$inject = ['$resource'];

  function InternshipsService($resource) {
    var Internship = $resource('api/internships');

    return Internships;
  }
}());
