'use strict';

// Declare app level module which depends on views, and components
angular.module('gacobom', [
    'ngRoute'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/games', {
                templateUrl: 'views/games/index.html',
                controller: 'GamesIndexController',
                controllerAs: 'gamesController'
            })
            .when('/comics', {templateUrl: 'views/comics/index.html'})
            .when('/books', {templateUrl: 'views/books/index.html'})
            .when('/', {templateUrl: 'views/main/index.html'})
            .otherwise({redirectTo: '/'});
    }]);
