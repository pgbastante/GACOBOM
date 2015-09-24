(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('gacobom', [
        'ngRoute',
        'ui.bootstrap']).
        config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
            // $locationProvider.html5Mode(true);
            $routeProvider
                .when('/games', {
                    templateUrl: 'views/games/index.html',
                    controller: 'GamesListCtrl',
                    controllerAs: 'games'
                })
                .when('/games/:id', {
                    templateUrl: 'views/games/show.html',
                    controller: 'GameCtrl',
                    controllerAs: 'game'
                })
                .when('/comics', {templateUrl: 'views/comics/index.html'})
                .when('/books', {templateUrl: 'views/books/index.html'})
                .when('/', {templateUrl: 'views/main/index.html'})
                .otherwise({redirectTo: '/l'});
        }]);
})();