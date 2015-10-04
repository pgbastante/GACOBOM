/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbThumbnails", ['API_SETTINGS', '$splash', function (API_SETTINGS, $splash) {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-thumbnails.html",
            scope: {
                items: "="
            },
            controller: function ($scope) {
                $scope.open = function (item) {
                    $splash.open({
                        splashImage: API_SETTINGS.API_URL + item.url,
                        splashText: item.text
                    });
                };
            },
            link: function (scope) {
                scope.apiUrl = API_SETTINGS.API_URL;
            }
        };
    }]);
}());