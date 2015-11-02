(function() {
    'use strict';
    angular.module('gacobom').directive('gcbInfo', gcbInfo);

    function gcbInfo() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-info.html',
            scope: {
                label: '@',
                val: '='
            }
        };
    }
}());