(function () {
  'use strict';

  angular.module('exams')
    .directive('drawMap', drawMap);

  drawMap.$inject = ['$rootScope', '$timeout'];

  function drawMap($rootScope, $timeout) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      var room;

      scope.$watch(attrs.drawMap, function(value) {
        room = value;
        drawMap();
      });

      function drawMap() {
        var map = room.map;

        // Setup canvas
        var canvas = element[0];
        canvas.width = map.width;
        canvas.height = map.height;

        // Initialise context
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, map.width, map.height);
        context.strokeRect(0, 0, map.width, map.height);

        // Context style
        context.scale(1, 1);
        context.font = 'normal 7pt Arial';

        // Draw the seats
        for (var i = 0; i < map.seats.length; i++) {
          var seat = map.seats[i];
          var rect = seat.rect;
          context.fillStyle = 'rgba(0, 0, 90, 0.2)';
          context.fillRect(rect.x, rect.y, rect.width, rect.height);
          context.fillStyle = 'black';
          context.fillText('#' + (i + 1), seat.x, seat.y);
        }

        // Draw the shapes
        map.shapes.forEach(function (shape) {
          var attr = shape.attr;
          switch (shape.type) {
            case 'rectangle':
              context.strokeRect(attr.x, attr.y, attr.width, attr.height);
              break;
          }
        });
      }
    }
  }
}());
