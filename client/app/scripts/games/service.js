/*global angular */

(function () {
    "use strict";

    angular.module('gacobom').factory('gamesFactory', ['API_SETTINGS', '$resource', function (API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/games/:id', {}, {});
    }]).factory('gameExtrasFactory', ['API_SETTINGS', '$resource', function (API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/games/:gameId/extras/:extraId', {
            extraId: '@id',
            gameId: '@gameId'
        }, {});
    }]);
}());