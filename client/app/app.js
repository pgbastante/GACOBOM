(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('gacobom', [
        'ngRoute',
        'ui.bootstrap',
        'ngSanitize',
        'ngResource',
        'ui.splash',
        'flow'])
        .constant('API_SETTINGS', {
            API_URL: 'http://app.gacobom.com'
        });
}());