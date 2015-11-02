(function() {
    'use strict';

    angular.module('gacobom').factory('topNavFactory', topNavFactory);

    topNavFactory.$inject = ['$http', 'API_SETTINGS'];

    function topNavFactory($http, API_SETTINGS) {
        return {
            getElementCount: function() {
                return $http.get(API_SETTINGS.API_URL + '/count');
            }
        };
    }
}());