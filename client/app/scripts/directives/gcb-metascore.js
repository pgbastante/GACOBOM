(function() {
    'use strict';
    angular.module('gacobom').directive('gcbMetascore', gcbMetascore);

    function gcbMetascore() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-metascore.html',
            scope: {
                metascore: '='
            }
        };
    }
}());