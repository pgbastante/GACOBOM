(function() {
    'use strict';

    angular.module('gacobom')
        .config(appConfig);

    appConfig.$inject = ['$locationProvider', '$routeProvider'];

    function appConfig($locationProvider, $routeProvider) {
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
            .when('/games/:id/edit', {
                templateUrl: 'views/games/edit.html'
            })
            .when('/comics', {templateUrl: 'views/comics/index.html'})
            .when('/books', {templateUrl: 'views/books/index.html'})
            .when('/', {templateUrl: 'views/main/index.html'})
            .otherwise({redirectTo: '/'});
    }
}());