/*global angular */
/*global $*/
(function () {
    "use strict";
    angular.module('gacobom').directive("gcbMediaManager", function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-media-manager.html",
            scope: {
                mediaFiles: "="
            },
            controller: function ($scope) {
                $scope.delete = function (id) {
                    $scope.mediaFiles = $.grep($scope.mediaFiles, function (e) {
                        return e.id !== id;
                    });
                };
            }
        };
    });
}());