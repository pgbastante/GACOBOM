/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbElement", ['API_SETTINGS', function (API_SETTINGS) {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-element.html",
            scope: {
                item: "=",
                url: "@"
            },
            link: function (scope) {
                scope.media_cover = API_SETTINGS.API_URL + scope.item.url + '/cover';
            }
        };
    }]);
}());