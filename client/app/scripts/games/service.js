/*global angular */

(function () {
    "use strict";

    angular.module('gacobom').factory('gamesFactory', ['$http', function ($http) {
        var gamesFactory = {};

        gamesFactory.getGames = function () {
            return $http.get('http://app.gacobom.com/games');
        };

        gamesFactory.getGame = function (id) {
            return $http.get('http://app.gacobom.com/games/' + id);
        };

        return gamesFactory;
    }]);


}());