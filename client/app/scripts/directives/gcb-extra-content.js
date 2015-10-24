/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbExtraContent", [function () {

        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-extra-content.html",
            scope: {
                extras: "=",
                url: '@'
            }
        };
    }]);
}());