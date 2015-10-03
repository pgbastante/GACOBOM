/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbMediaList", function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-media-list.html",
            scope: {
                items: "=",
                limitPerPage: "=",
                mediaCount: "=",
                numPages: "=",
                pageIndex: "="
            }
        };
    });
}());