/*global angular */

(function () {
    "use strict";

    angular.module('gacobom').factory('gamesFactory', ['$http', 'API_SETTINGS', function ($http, API_SETTINGS) {
        return {
            getGames: function () {
                return $http.get(API_SETTINGS.API_URL + '/games');
            },
            getGame: function (id) {
                return $http.get(API_SETTINGS.API_URL + '/games/' + id);
            }
        };
    }]);
}());