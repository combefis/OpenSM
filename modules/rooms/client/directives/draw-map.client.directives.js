(function () {
  'use strict';

  angular.module('rooms')
    .directive('drawMap', drawMap);

  drawMap.$inject = ['$rootScope', '$timeout'];

  function drawMap($rootScope, $timeout) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      var configuration;

      scope.$watch(attrs.drawMap, function(value) {
        configuration = value;
        drawMap();
      });

      function drawMap() {
        var map = configuration.room.map;

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

        context.fillText(configuration.room.code, 10, 15);
        context.fillText(configuration.course, 10, 25);
        context.fillText(configuration.date, 10, 35);

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

        // Draw the configuration
        if (configuration.configuration !== null) {
          var config = configuration.room.configurations[configuration.configuration];
          for (var j = 0; j < config.seats.length; j++) {
            var s = map.seats[config.seats[j].seat];
            context.fillText(getLetter(config.seats[j].serie + 1), s.x, s.y + 15);
          }

          // Draw the seats assignment
          if (configuration.registrations) {
            configuration.registrations.forEach(function (element) {
              var s = map.seats[config.seats[element.seat].seat];
              context.fillText(element.student.lastname, s.x, s.y + 25);
              context.fillText(element.student.firstname, s.x, s.y + 35);
            });
          }
        }
      }
    }

    // Convert an integer to a letter 1 => A, 2 => B...
    function getLetter (i) {
      return String.fromCharCode(64 + i);
    }
  }
}());
