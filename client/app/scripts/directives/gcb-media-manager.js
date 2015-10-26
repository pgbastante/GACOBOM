/*global angular */
/*global $*/
(function () {
    "use strict";
    angular.module('gacobom').directive("gcbMediaManager", [function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-media-manager.html",
            scope: {
                mediaFiles: "=",
                url: "@",
                uploadVisibility: "=",
                title: "@",
                anchor: "@"
            },
            controller: function ($scope) {
                $scope.delete = function (id) {
                    $scope.mediaFiles = $.grep($scope.mediaFiles, function (e) {
                        return e.id !== id;
                    });
                };

                $scope.uploadVisibility = false;

                $scope.onMediaUpload = function (file, message, flow) {
                    $scope.mediaFiles.push(JSON.parse(message));
                };

            }
        };
    }]);
}());