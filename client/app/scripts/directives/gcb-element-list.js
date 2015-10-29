(function() {
    'use strict';
    angular.module('gacobom').directive('gcbElementList', [gcbElementList]);

    function gcbElementList() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-element-list.html',
            scope: {
                items: '=',
                limitPerPage: '=',
                elementCount: '=',
                numPages: '=',
                pageIndex: '='
            }
        };
    }
}());