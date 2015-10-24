/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbLinks", [function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-links.html",
            scope: {
                links: "="
            }
        };
    }]);
}());