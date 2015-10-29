(function() {
    'use strict';

    angular.module('gacobom').factory('topNavFactory', ['$http', 'API_SETTINGS', topNavFactory]);

    function topNavFactory($http, API_SETTINGS) {
        return {
            getElementCount: function() {
                return $http.get(API_SETTINGS.API_URL + '/count');
            }
        };
    }
}());