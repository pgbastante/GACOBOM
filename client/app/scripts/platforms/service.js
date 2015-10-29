(function() {
    'use strict';

    angular.module('gacobom')
        .factory('platformFactory', ['API_SETTINGS', '$resource', platformFactory]);

    function platformFactory(API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/platforms/:id', {}, {});
    }
}());