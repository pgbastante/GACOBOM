(function() {
    'use strict';
    angular.module('gacobom').directive('gcbElement', ['API_SETTINGS', gcbElement]);

    function gcbElement(API_SETTINGS) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-element.html',
            scope: {
                item: '=',
                url: '@'
            },
            link: function(scope) {
                scope.mediaCover = API_SETTINGS.API_URL + scope.item.url + '/cover';
            }
        };
    }
}());