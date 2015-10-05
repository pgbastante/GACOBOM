/*global angular */

(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('gacobom', [
        'ngRoute',
        'ui.bootstrap',
        'ngSanitize',
        'ngResource',
        'ui.splash'])
        .constant("API_SETTINGS", {
            "API_URL": "http://app.gacobom.com"
        })
        .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/games', {
                    templateUrl: 'views/games/index.html',
                    controller: 'GamesListCtrl',
                    controllerAs: 'games'
                })
                .when('/games/:id', {
                    templateUrl: 'views/games/show.html'
                })
                .when('/comics', {templateUrl: 'views/comics/index.html'})
                .when('/books', {templateUrl: 'views/books/index.html'})
                .when('/', {templateUrl: 'views/main/index.html'})
                .otherwise({redirectTo: '/'});
        }]);
}());