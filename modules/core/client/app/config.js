(function (window) {
  'use strict';

  var applicationModuleName = 'opensm';

  var service = {
    applicationEnvironment: window.env,
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: ['ngResource', 'ngCookies', 'ngAnimate', 'ngMessages', 'ui.router', 'ui.bootstrap', 'angularFileUpload', 'ngTagsInput', 'nya.bootstrap.select', 'pascalprecht.translate', 'angularMoment', 'ui.bootstrap.datetimepicker', 'ui-notification', 'ngFileUpload'],
    registerModule: registerModule
  };

  window.ApplicationConfiguration = service;

  // Add a new vertical module
  function registerModule (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  }

  // Angular-ui-notification configuration
  angular.module('ui-notification').config(function(NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 3000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'bottom'
    });
  });
}(window));
