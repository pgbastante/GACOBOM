(function() {
    'use strict';
    angular.module('gacobom').directive('gcbCredits', gcbCredits);

    function gcbCredits() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-credits.html',
            scope: {
                credits: '='
            }
        };
    }
}());