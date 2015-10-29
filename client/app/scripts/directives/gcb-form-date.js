(function() {
    'use strict';
    angular.module('gacobom').directive('gcbFormDate', [gcbFormDate]);

    function gcbFormDate() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-form-date.html',
            scope: {
                label: '@',
                val: '='
            },
            controller: function($scope) {
                $scope.$watch('val', createDate);

                function createDate() {
                    $scope.date = new Date($scope.val);
                }
            }
        };
    }
}());