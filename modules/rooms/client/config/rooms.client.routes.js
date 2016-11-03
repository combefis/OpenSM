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
      })
      .state('admin.manage.rooms.create', {
        url: '/create',
        templateUrl: 'modules/rooms/client/views/form-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        resolve: {
          roomResolve: newRoom
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create a room'
        }
      })
      .state('admin.manage.rooms.view', {
        url: '/:roomId',
        templateUrl: 'modules/rooms/client/views/view-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        resolve: {
          roomResolve: getRoom
        },
        data: {
          pageTitle: '{{roomResolve.id}}'
        }
      })
      .state('admin.manage.rooms.edit', {
        url: '/:roomId/edit',
        templateUrl: 'modules/rooms/client/views/form-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        resolve: {
          roomResolve: getRoom
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit a room'
        }
      });
  }

  getRoom.$inject = ['$stateParams', 'RoomsService'];

  function getRoom($stateParams, RoomsService) {
    return RoomsService.get({
      roomId: $stateParams.roomId
    }).$promise;
  }

  newRoom.$inject = ['RoomsService'];

  function newRoom(RoomsService) {
    return new RoomsService();
  }
}());
