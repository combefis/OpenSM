(function () {
  'use strict';

  angular
    .module('internships.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teacher.manage.internships', {
        abstract: true,
        url: '/internships',
        template: '<ui-view/>'
      })

      .state('teacher.manage.internships.list', {
        url: '',
        templateUrl: 'modules/internships/client/views/list-internships-teacher.client.view.html',
        controller: 'InternshipsTeacherListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Internships management'
        }
      })

      .state('teacher.manage.internships.subjectApproval', {
        url: '/:internshipId/subjectApproval',
        templateUrl: 'modules/internships/client/views/form-internship-teacher-subjectApproval.client.view.html',
        controller: 'InternshipsController',
        controllerAs: 'vm',
        resolve: {
          internshipResolve: getInternship
        },
        data: {
          pageTitle: 'Subject approval'
        }
      })

      .state('teacher.manage.internships.supervisorApproval', {
        url: '/:internshipId/supervisorDemand',
        templateUrl: 'modules/internships/client/views/form-internship-teacher-supervisorApproval.client.view.html',
        controller: 'InternshipsController',
        controllerAs: 'vm',
        resolve: {
          internshipResolve: getInternship
        },
        data: {
          pageTitle: 'Supervisor demand'
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

  newInternship.$inject = ['InternshipsService'];

  function newInternship(InternshipsService) {
    return new InternshipsService();
  }

}());
