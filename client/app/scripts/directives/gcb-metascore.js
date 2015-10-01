/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbMetascore", function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-metascore.html",
            scope: {
                metascore: "="
            }
        };
    });
}());