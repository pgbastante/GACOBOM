(function() {
    'use strict';
    angular.module('gacobom').directive('gcbLinks', gcbLinks);

    function gcbLinks() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-links.html',
            scope: {
                links: '='
            }
        };
    }
}());