/*global angular */

(function () {
    "use strict";

    angular.module('gacobom').factory('gamesFactory', ['$http', 'API_SETTINGS', '$resource', function ($http, API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/games/:id', {}, {});
    }]);
}());