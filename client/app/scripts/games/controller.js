/*global angular */

(function () {
    "use strict";
    angular.module('gacobom')
        .controller('GamesListCtrl', ['gamesFactory', function (gamesFactory) {
            var ctrlr = this;

            function listGames() {
                gamesFactory.getGames().success(function (g) {
                    ctrlr.list = g;
                }).error(function (e) {
                    ctrlr.status = 'Unable to list games: ' + e.message;
                });
            }

            listGames();

        }])
        .controller('GameCtrl', ['$routeParams', 'gamesFactory', function ($routeParams, gamesFactory) {
            var ctrlr = this;

            function getGame() {
                gamesFactory.getGame($routeParams.id).success(function (data) {
                    ctrlr.data = data;
                }).catch(function (data) {
                    ctrlr.errors = data.status;
                });
            }

            getGame();
        }]);
}());


