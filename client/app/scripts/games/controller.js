/*global angular */
/*global $*/
(function () {
    "use strict";
    angular.module('gacobom')
        .controller('GamesListCtrl', ['gamesFactory', function (gamesFactory) {
            var ctrlr = this;
            ctrlr.list = gamesFactory.query(function (data) {
                ctrlr.mediaCount = data.length;
            });
        }])
        .controller('GameCtrl', ['$routeParams', 'gamesFactory', 'API_SETTINGS', function ($routeParams, gamesFactory, API_SETTINGS) {
            var ctrlr = this;
            ctrlr.url = API_SETTINGS.API_URL + '/games/' + $routeParams.id;
            ctrlr.data = gamesFactory.get({id: $routeParams.id});
        }])
        .controller('GameEditCtrl', ['$routeParams', 'gamesFactory', 'gameExtrasFactory', 'API_SETTINGS', function ($routeParams, gamesFactory, gamesExtrasFactory, API_SETTINGS) {
            var ctrlr = this;

            ctrlr.url = API_SETTINGS.API_URL + '/games/' + $routeParams.id;

            ctrlr.data = gamesFactory.get({id: $routeParams.id}, function (game) {
                ctrlr.mediaFiles = $.merge(game.media, game.artwork);
                ctrlr.extras = $.merge($.merge(game.versions, game.trivia), game.cheats);
            });

            ctrlr.options = [{
                key: 'general',
                name: 'General Game Info'
            }, {
                key: 'media',
                name: 'Media Files'
            }, {
                key: 'credits',
                name: 'Credits'
            }, {
                key: 'extra',
                name: 'Extra Information'
            }];

            ctrlr.addExtra = function () {
                return gamesExtrasFactory.save({gameId: $routeParams.id});
            };

        }]);
}());


