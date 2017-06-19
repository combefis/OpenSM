(function () {
  'use strict';

  angular
    .module('internships.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider

    .state('master.manage.students', {
      abstract: true,
      url: '/students',
      template: '<ui-view/>'
    })

    .state('master.manage.students.list', {
      url: '',
      templateUrl: 'modules/internships/client/views/list-students-master.client.view.html',
      controller: 'StudentsListController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Internships management'
      }
    })

    .state('master.manage.students.internships', {
      url: '/:studentId/internships',
      template: '<ui-view/>',
      studentName: ':studentName'
    })

    .state('master.manage.students.internships.list', {
      url: '/list',
      templateUrl: 'modules/internships/client/views/list-internships-master.client.view.html',
      controller: 'MasterInternshipsListController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'View internship details'
      }
    })

    .state('master.manage.students.internships.view', {
      url: '/:internshipId/edit',
      templateUrl: 'modules/internships/client/views/view-internship-master.client.view.html',
      controller: 'InternshipMasterController',
      controllerAs: 'vm',
      resolve: {
        internshipResolve: getInternship
      },
      data: {
        pageTitle: 'View internship details'
      }
    })

    .state('master.manage.students.internships.firstVisitNotes', {
      url: '/:internshipId/edit/firstVisit',
      templateUrl: 'modules/internships/client/views/form-internship-master-firstVisitNotes.client.view.html',
      controller: 'InternshipFirstVisitController',
      controllerAs: 'vm',
      resolve: {
        internshipResolve: getInternship
      },
      data: {
        pageTitle: 'First Visit management'
      }
    })

    .state('master.manage.students.internships.intermediateEvaluationNotes', {
      url: '/:internshipId/edit/intermediateEvaluation',
      templateUrl: 'modules/internships/client/views/form-internship-master-intermediateEvaluationNotes.client.view.html',
      controller: 'InternshipIntermediateEvaluationMasterController',
      controllerAs: 'vm',
      resolve: {
        internshipResolve: getInternship
      },
      data: {
        pageTitle: 'First Visit management'
      }
    })

    .state('master.manage.students.internships.oralPresentationNotes', {
      url: '/:internshipId/edit/firstVisit',
      templateUrl: 'modules/internships/client/views/form-internship-master-oralPresentationNotes.client.view.html',
      controller: 'InternshipOralPresentationController',
      controllerAs: 'vm',
      resolve: {
        internshipResolve: getInternship
      },
      data: {
        pageTitle: 'First Visit management'
      }
    })
    ;
  }

  getInternship.$inject = ['$stateParams', 'InternshipsService'];

  function getInternship($stateParams, InternshipsService) {
    return InternshipsService.get({
      internshipId: $stateParams.internshipId // $stateParams = "prends dans l'url"
    }).$promise;
  }

  getStudent.$inject = ['$stateParams', 'StudentsService'];

  function getStudent($stateParams, StudentsService) {
    return StudentsService.get({
      studentId: $stateParams.studentId // $stateParams = "prends dans l'url"
    }).$promise;
  }

  newInternship.$inject = ['InternshipsService'];

  function newInternship(InternshipsService) {
    return new InternshipsService();
  }

}());
