(function() {
    'use strict';
    angular.module('gacobom').directive('gcbElement', gcbElement);

    gcbElement.$inject = ['API_SETTINGS'];

    function gcbElement(API_SETTINGS) {
        function link(scope) {
            scope.mediaCover = API_SETTINGS.API_URL + scope.item.url + '/cover';
        }

        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-element.html',
            scope: {
                item: '=',
                url: '@'
            },
            link: link
        };
    }
}());