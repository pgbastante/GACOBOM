/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbInfo", function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-info.html",
            scope: {
                label: "@",
                val: "="
            }
        };
    });
}());