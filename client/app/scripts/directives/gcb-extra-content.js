/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbExtraContent", ['API_SETTINGS', function (API_SETTINGS) {

        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-extra-content.html",
            scope: {
                extras: "="
            },
            link: function (scope) {
                scope.apiUrl = API_SETTINGS.API_URL;
            }
        };
    }]);
}());