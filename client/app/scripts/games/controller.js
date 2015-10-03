/*global angular */

(function () {
    "use strict";
    angular.module('gacobom')
        .controller('GamesListCtrl', ['gamesFactory', function (gamesFactory) {
            var ctrlr = this;

            function listGames() {
                ctrlr.list = gamesFactory.query(function (data) {
                    ctrlr.mediaCount = data.length;
                });
            }

            listGames();

        }])
        .controller('GameCtrl', ['$routeParams', 'gamesFactory', function ($routeParams, gamesFactory) {
            var ctrlr = this;

            function getGame() {
                ctrlr.data = gamesFactory.get({id: $routeParams.id});
            }

            getGame();
        }]);
}());


