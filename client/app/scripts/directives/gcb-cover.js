/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbCover", ['$splash', function ($splash) {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-cover.html",
            scope: {
                url: "@"
            },
            controller: function ($scope) {
                $scope.open = function () {
                    $splash.open({
                        splashImage: $scope.url + '/cover'
                    });
                };
            },
            link: function (scope) {
                scope.image_url = scope.url + '/cover';
            }
        };
    }]);
}());