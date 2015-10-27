/*global angular */
/*global $*/

(function () {
    "use strict";
    angular.module('gacobom').directive('gcbExtraContentManagerItem', [function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-extra-content-manager-item.html",
            scope: {
                item: "=",
                url: "@"
            },
            controller: function ($scope) {
                $scope.deleteFile = function (fileId) {

                    $scope.item.files = $.grep($scope.item.files, function (file) {
                        return file.id !== fileId;
                    });

                };

                $scope.onFileUpload = function (file, message, flow) {
                    if ($scope.item.files === undefined) {
                        $scope.item.files = [];
                    }
                    $scope.item.files.push(JSON.parse(message));
                };
            }
        };

    }]);
}());