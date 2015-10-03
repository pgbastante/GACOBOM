/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbMedia", ['API_SETTINGS', function (API_SETTINGS) {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-media.html",
            scope: {
                item: "="
            },
            link: function (scope) {
                scope.media_cover = API_SETTINGS.API_URL + scope.item.url + '/cover';
            }
        };
    }]);
}());