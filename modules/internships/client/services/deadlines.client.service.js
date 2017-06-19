(function () {  // on DEFINIT ce qu'est le service, on ne le crée pas. le creer sera du boulot du new.
  'use strict';

  angular
    .module('internships.services')
    .factory('DeadlinesService', DeadlinesService);

  DeadlinesService.$inject = ['$resource'];

  function DeadlinesService($resource) {

    var Deadlines = $resource('api/internships/deadlines/:deadlinesId', { // je déclare la route (avec les get post delete derrière) qui mène à mon serveur
      deadlinesId: '@_id'  // il va chercher autiomatiquement l'id dedans.
    },

      {
        update: { // quand je fais un update ca appelle PUt. J'aurais pu dire "quand je fais un "prout" ca appelle get.
          method: 'PUT'
        }
      });

    angular.extend(Deadlines.prototype, {  // on étend le service. Quand on aura créé un
      createOrUpdate: function() {
        var deadlines = this;
        return createOrUpdate(deadlines);
      }
      // faire qqchose d'autre: function (){} et on le définirait plus loin
    });

    return Deadlines;

    function createOrUpdate(deadlines) {
      console.log('in createOrUpdate function in service');
      if (deadlines._id) {
        console.log('deadlines exists');
        console.log(deadlines);
        return deadlines.$update(onSuccess, onError);
      }
      console.log('deadlines does not exist');
      return deadlines.$save(onSuccess, onError); // equivalent à http.p

      // $save et $update existent deja, la on choisi juste entre les deux.

      // Handle successful response
      function onSuccess(deadlines) {
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
      console.log(error);
    }
  }
}());
