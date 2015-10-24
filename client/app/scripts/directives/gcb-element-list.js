/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbElementList", [function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-element-list.html",
            scope: {
                items: "=",
                limitPerPage: "=",
                mediaCount: "=",
                numPages: "=",
                pageIndex: "="
            }
        };
    }]);
}());