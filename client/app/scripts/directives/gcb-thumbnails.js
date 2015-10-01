/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbThumbnails", ['API_SETTINGS', function (API_SETTINGS) {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-thumbnails.html",
            scope: {
                items: "="
            },
            link: function (scope) {
                scope.apiUrl = API_SETTINGS.API_URL;
            }
        };
    }]);
}());