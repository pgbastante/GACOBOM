/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbFormDate", [function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-form-date.html",
            scope: {
                label: "@",
                val: "="
            },
            controller: function ($scope) {
                $scope.$watch("val", function () {
                    $scope.date = new Date($scope.val);
                });
            }
        };
    }]);
}());