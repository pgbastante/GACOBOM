(function() {
    'use strict';

    angular.module('gacobom')
        .factory('gamesFactory', ['API_SETTINGS', '$resource', gamesFactory])
        .factory('gameExtrasFactory', ['API_SETTINGS', '$resource', gameExtrasFactory]);

    function gamesFactory(API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/games/:id', {}, {});
    }

    function gameExtrasFactory(API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/games/:gameId/extras/:extraId', {
            extraId: '@id',
            gameId: '@gameId'
        }, {});
    }
}());