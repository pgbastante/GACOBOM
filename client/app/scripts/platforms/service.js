(function() {
    'use strict';

    angular.module('gacobom')
        .factory('platformFactory', platformFactory);

    platformFactory.$inject = ['API_SETTINGS', '$resource'];

    function platformFactory(API_SETTINGS, $resource) {
        return $resource(API_SETTINGS.API_URL + '/platforms/:id', {}, {});
    }
}());