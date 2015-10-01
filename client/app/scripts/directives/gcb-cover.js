/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbCover", ['API_SETTINGS', function (API_SETTINGS) {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-cover.html",
            scope: {
                id: "="
            },
            link: function (scope) {
                scope.image_url = API_SETTINGS.API_URL + '/games/' + scope.id + '/cover';
            }
        };
    }]);
}());