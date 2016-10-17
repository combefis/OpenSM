(function () {
  'use strict';

  angular
    .module('rooms.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.manage.rooms', {
        abstract: true,
        url: '/rooms',
        template: '<ui-view/>'
      })
      .state('admin.manage.rooms.list', {
        url: '',
        templateUrl: 'modules/rooms/client/views/list-rooms.client.view.html',
        controller: 'RoomsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rooms list'
        }
      });
  }
}());
