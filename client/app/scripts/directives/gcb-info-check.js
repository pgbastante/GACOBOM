/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbInfoCheck", [function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-info-check.html",
            scope: {
                label: "@",
                val: "="
            }
        };
    }]);
}());