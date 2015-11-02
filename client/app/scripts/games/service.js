(function() {
    'use strict';

    angular.module('gacobom')
        .factory('gamesFactory', gamesFactory)
        .factory('gamesExtrasFactory', gamesExtrasFactory);

    gamesFactory.$inject = ['API_SETTINGS', '$resource'];

    function gamesFactory(API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/games/:id', {}, {});
    }

    gamesExtrasFactory.$inject = ['API_SETTINGS', '$resource'];

    function gamesExtrasFactory(API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/games/:gameId/extras/:extraId', {
            extraId: '@id',
            gameId: '@gameId'
        }, {});
    }
}());