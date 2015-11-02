(function() {
    'use strict';
    angular.module('gacobom').directive('gcbInfoCheck', gcbInfoCheck);

    function gcbInfoCheck() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-info-check.html',
            scope: {
                label: '@',
                val: '='
            }
        };
    }
}());