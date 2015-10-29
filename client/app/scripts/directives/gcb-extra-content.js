(function() {
    'use strict';
    angular.module('gacobom').directive('gcbExtraContent', [gcbExtraContent]);

    function gcbExtraContent() {

        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-extra-content.html',
            scope: {
                extras: '=',
                url: '@'
            }
        };
    }
}());