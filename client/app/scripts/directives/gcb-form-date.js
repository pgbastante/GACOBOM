(function() {
    'use strict';
    angular.module('gacobom').directive('gcbFormDate', gcbFormDate);

    function gcbFormDate() {
        function link(scope) {
            scope.$watch('val', createDate);

            function createDate() {
                scope.date = new Date(scope.val);
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-form-date.html',
            scope: {
                label: '@',
                val: '='
            },
            link: link
        };
    }
}());