/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbCredits", function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-credits.html",
            scope: {
                credits: "="
            }
        };
    });
}());