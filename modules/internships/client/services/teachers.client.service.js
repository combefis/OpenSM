(function () {  // on DEFINIT ce qu'est le service, on ne le crée pas. le creer sera du boulot du new.
  'use strict';

  angular
    .module('internships.services')
    .factory('TeachersService', TeachersService);

  TeachersService.$inject = ['$resource'];

  function TeachersService($resource) {

    var Teacher = $resource('api/teachers/:teacherId', { // je déclare la route (avec les get post delete derrière) qui mène à mon serveur
      teacherId: '@_id'  // il va chercher autiomatiquement l'id dedans.
    }
    );

    return Teacher;

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
