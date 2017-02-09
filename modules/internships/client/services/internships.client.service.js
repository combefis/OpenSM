(function () {  // on DEFINIT ce qu'est le service, on ne le crée pas. le creer sera du boulot du new.
  'use strict';

  angular
    .module('internships.services')
    .factory('InternshipsService', InternshipsService);

  InternshipsService.$inject = ['$resource'];

  function InternshipsService($resource) {

    var Internship = $resource('api/internships/:internshipId', { // je déclare la route (avec les get post delete derrière) qui mène à mon serveur
      internshipId: '@_id'  // il va chercher autiomatiquement l'id dedans.
    },

      {
        update: { // quand je fais un update ca appelle PUt. J'aurais pu dire "quand je fais un "prout" ca appelle get.
          method: 'PUT'
        }
      });

    angular.extend(Internship.prototype, {  // on étend le service. Quand on aura créé un
      createOrUpdate: function() {
        var internship = this;
        return createOrUpdate(internship);
      }
      // faire qqchose d'autre: function (){} et on le définirait plus loin
    });

    return Internship;

    function createOrUpdate(internship) {
      console.log('in createOrUpdate function in service');
      if (internship._id) {
        console.log('internship exists');
        return internship.$update(onSuccess, onError);
      }
      console.log('internship does not exist');
      return internship.$save(onSuccess, onError); // equivalent à http.p

      // $save et $update existent deja, la on choisi juste entre les deux.

      // Handle successful response
      function onSuccess(internship) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
