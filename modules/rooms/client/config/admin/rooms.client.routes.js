(function() {
  'use strict';

  angular
    .module('rooms.admin.routes')
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
        templateUrl: '/modules/rooms/client/views/admin/list-rooms.client.view.html',
        controller: 'RoomsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Rooms list'
        }
      })
      .state('admin.manage.rooms.create', {
        url: '/create',
        templateUrl: '/modules/rooms/client/views/admin/form-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Create a room'
        },
        resolve: {
          roomResolve: newRoom
        }
      })
      .state('admin.manage.rooms.view', {
        url: '/:roomCode',
        templateUrl: '/modules/rooms/client/views/admin/view-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{roomResolve.code}}'
        },
        resolve: {
          roomResolve: getRoom
        }
      })
      .state('admin.manage.rooms.edit', {
        url: '/:roomCode/edit',
        templateUrl: '/modules/rooms/client/views/admin/form-room.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Edit room {{roomResolve.code}}'
        },
        resolve: {
          roomResolve: getRoom
        }
      });
  }

  getRoom.$inject = ['$stateParams', 'RoomsService'];

  function getRoom($stateParams, RoomsService) {
    return RoomsService.get({
      roomCode: $stateParams.roomCode
    }).$promise;
  }

  newRoom.$inject = ['RoomsService'];

  function newRoom(RoomsService) {
    return new RoomsService();
  }
}());
