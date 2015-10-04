/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbCover", ['API_SETTINGS', '$splash', function (API_SETTINGS, $splash) {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-cover.html",
            scope: {
                id: "="
            },
            controller: function ($scope) {
                $scope.open = function () {
                    $splash.open({
                        splashImage: API_SETTINGS.API_URL + '/games/' + $scope.id + '/cover'
                    });
                };
            },
            link: function (scope) {
                scope.image_url = API_SETTINGS.API_URL + '/games/' + scope.id + '/cover';
            }
        };
    }]);
}());