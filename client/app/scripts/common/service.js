/*global angular */

(function () {
    "use strict";

    angular.module('gacobom').factory('commonFactory', ['$http', 'API_SETTINGS', function ($http, API_SETTINGS) {
        return {
            getMediaCount: function () {
                return $http.get(API_SETTINGS.API_URL + '/count');
            }
        };
    }]);


}());