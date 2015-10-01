/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbInfoRepeat", function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-info-repeat.html",
            scope: {
                label: "@",
                val: "="
            }
        };
    });
}());