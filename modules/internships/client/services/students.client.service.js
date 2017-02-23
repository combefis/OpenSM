(function () {  // on DEFINIT ce qu'est le service, on ne le crée pas. le creer sera du boulot du new.
  'use strict';

  angular
    .module('internships.services')
    .factory('StudentsService', StudentsService);

  StudentsService.$inject = ['$resource'];

  function StudentsService($resource) {

    var Student = $resource('api/students/:studentId', { // je déclare la route (avec les get post delete derrière) qui mène à mon serveur
      studentId: '@_id'  // il va chercher autiomatiquement l'id dedans.
    }
    );

    return Student;

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
