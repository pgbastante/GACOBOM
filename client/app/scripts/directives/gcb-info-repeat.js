(function() {
    'use strict';
    angular.module('gacobom').directive('gcbInfoRepeat', [gcbInfoRepeat]);

    function gcbInfoRepeat() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-info-repeat.html',
            scope: {
                label: '@',
                val: '='
            }
        };
    }
}());