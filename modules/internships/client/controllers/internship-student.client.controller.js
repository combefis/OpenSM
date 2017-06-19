(function () {
  'use strict';

  angular
    .module('internships')
    .controller('InternshipsStudentViewController', InternshipsController);

  InternshipsController.$inject = ['$scope', '$state', 'internshipResolve', '$window', 'Authentication', 'DeadlinesService', '$http', '$filter'];

  function InternshipsController($scope, $state, internship, $window, Authentication, DeadlinesService, $http, filter) {
    var vm = this; // on instancie tout ce qu'on vient de lui passer

    vm.authentication = Authentication;
    vm.internship = internship; // le "resolve"
    vm.title = '';

    if ((vm.internship.firstVisit.masterValidation) || (vm.internship.firstVisit.supervisorValidation) || (vm.internship.firstVisit.masterNotes.length > 0) || (vm.internship.firstVisit.supervisorNotes.length > 0)) {
      vm.internship.firstVisitLocked = true;
    }

    if ((vm.internship.intermediateEvaluation.masterValidation) || (vm.internship.intermediateEvaluation.masterNotes.length > 0)) {
      vm.internship.intermediateEvaluationLocked = true;
    }

    if (vm.internship.generalStatus === 'Enterprise Encoding') {
      vm.title = 'Enterprise Encoding';
      vm.status = 'Non encodé';
      vm.instructions = 'Les informations de l\'enterprise ne sont pas complètes, merci de les encoder.';
    }

    if (vm.internship.generalStatus === 'Proposition Encoding') {
      vm.title = 'Encodage de la proposition';
      vm.status = 'Non encodé';
      vm.instructions = 'Les informations concernant la proposition de stage ne sont pas complètes, merci de les encoder.';
    }


    if (['Proposition Validation', 'Proposition Reincoding', 'Proposition Revalidation'].includes(vm.internship.generalStatus)) {

      vm.title = 'Validation de la proposition de stage';

      if (vm.internship.generalStatus === 'Proposition Validation') {
        vm.status = 'Attente de réponses';
        vm.instructions = 'En attente des réponses du maître de stage, coordinateur et enseignant.';
      }

      if (vm.internship.generalStatus === 'Proposition Reincoding') {
        vm.status = 'Non Validé.';
        vm.instructions = 'La proposition n\'as pas été validée. Merci de la réencoder en apportant les modifications nécessaires.';
      }

      if (vm.internship.generalStatus === 'Proposition Revalidation') {
        vm.status = 'Attente de réponses.';
        vm.instructions = 'La proposition est en cours de revalidation, en attente des réponses du maître de stage, coordinateur et enseignant.';
      }
    }

    if (vm.internship.generalStatus === 'Supervisor Attribution') {
      vm.title = 'Attribution du Superviseur';
      vm.status = 'Choix du Superviseur.';
      vm.instructions = 'Merci d\'encoder votre préférence pour le choix du Superviseur. Ce dernier sera ensuite validé dans la limite des stocks disponibles.';

      if (vm.internship.supervisor && vm.internship.supervisor.proposedSupervisor) {
        vm.status = 'Validation du Superviseur';
        vm.instructions = 'En attente de validation de vos préférences par le coordinateur d\'année.';
        vm.internship.supervisor.status = 'En attente de validation de vos préférences par le coordinateur d\'année.';
      }
    }

    if (internship.generalStatus === 'Validation') {
      vm.title = 'Convention de stage';
      vm.status = 'Validation finale du stage.';
      vm.instructions = 'En attente de l\'accord final du validateur de section avant de sortir la convention de stage';
    }

    if (internship.generalStatus === 'Convention Signing') {
      console.log(vm.internship.convention);
      if (internship.convention.given) {
        vm.title = 'Convention de stage';
        vm.status = 'Validation de la convention de stage.';
        vm.instructions = 'La convention de stage signée n\'a pas encore été rendue à l\'administration et validé.';
      } else {
        vm.title = 'Convention de stage';
        vm.status = 'Stage validé. Sortie de la convention de stage';
        vm.instructions = 'Le stage a été validé. La convention de stage n\'as pas encore étée délivrée par l\'administration.';
      }
    }

    if (internship.generalStatus === 'Activities Note Encoding') {

      if (internship.activitiesNote.generalObjectives.length === 0) {
        vm.title = 'Note d\'Activitées';
        vm.status = 'Rédaction de la note d\'activitées';
        vm.instructions = 'Merci d\'encoder la note d\'activitées pour le stage.';
      }
    }
    console.log(internship.generalStatus);
    if (internship.generalStatus === 'Activities Note Validation') {
      vm.title = 'Note d\'Activitées';
      vm.status = 'Validation de la note d\'Activitées';
      vm.instructions = 'En attente de validation par le maître de stage et superviseur';
    }

    if (internship.generalStatus === 'Activities Note Reincoding') {
      vm.title = 'Note d\'Activitées';
      vm.status = 'Non validé';
      vm.instructions = 'la note d\'activitées n\'a pas été validée, veuillez apporter les modifications nécessaires';

    }

    if (internship.generalStatus === 'Internship') {
      console.log('internship');
    }

    if (internship.generalStatus === 'First Visit') {
      vm.title = 'Première Visite';
      if (!internship.firstVisit.date || !internship.firstVisit.location) {
        vm.status = 'Encodage Lieu et Date';
        vm.instructions = 'En consultation avec le Maître de stage et le Superviseur de stage, Merci de convenir d\'un lieu ainsi que d\'une date pour effecture la première visite du stage.';
      }

      if (internship.firstVisit.date && internship.firstVisit.location) {
        vm.status = 'Lieu et Date encodés.';
        vm.instructions = 'En attente du déroulement de la visite et des commentaires du Superviseur de stage.';
      }

      if (internship.firstVisit.done) {
        vm.status = 'Première visite effectuée';
        vm.instructions = 'En attente de l\'encodage du feedback par le superviseur';
      }

      if (internship.firstVisit.supervisorValidation) {
        vm.instructions = 'Feedback du Superviseur encodé';
      }
      if (internship.firstVisit.masterValidation) {
        vm.instructions = 'Feedback du maître de stage encodé';
      }
    }

    if (internship.generalStatus === 'Oral Presentation') {
      vm.title = 'Oral Presentation';

      if (!internship.oralPresentation.date || !internship.oralPresentation.location) {
        vm.status = 'Encodage Lieu et Date';
        vm.instructions = 'En consultation avec le Maître de stage et le Superviseur de stage, Merci de convenir d\'un lieu ainsi que d\'une date pour effecture la présentation orale.';
      }

      if (internship.oralPresentation.date && internship.oralPresentation.location) {
        vm.status = 'Lieu et Date encodés';
        vm.instructions = 'En attente du déroulement de la présentation Orale et de l\'encodage de son évaluation.';
      }
      if (internship.oralPresentation.supervisorValidation) {
        vm.instructions = 'Feedback du Superviseur encodé';
      }
      if (internship.oralPresentation.masterValidation) {
        vm.instructions = 'Feedback du maître de stage encodé';
      }
    }

    if (internship.generalStatus === 'Final Delivery') {

      vm.status = 'Aucun délivrable n\'a pour l\'instant été rendu.';
      vm.instructions = 'En attente du rapport écrit et du certificat de stage.';
      vm.title = 'Délivrables finaux.';
      vm.reportStatus = 'en attente.';
      vm.certificateStatus = 'en attente.';
      if (internship.certificate.handedIn) {
        vm.status = 'Le certificat a été rendu.';
        vm.instructions = 'En attente du rapport écrit';
      }
      if (internship.writtenReport.handedIn) {
        vm.status = 'Le rapport écrit a été rendu.';
        vm.instructions = 'En attente du certificat de stage.';
      }
      if ((internship.writtenReport.handedIn) && (internship.certificate.handedIn)) {
        vm.status = 'tous les délivrables ont étés rendus';
        vm.instructions = 'Bon, maintenant quoi?';
      }
    }
  }
}());
