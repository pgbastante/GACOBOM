/*global angular */
/*global $*/

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbExtraContentManager", function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-extra-content-manager.html",
            scope: {
                extras: "="
            },
            controller: function ($scope) {
                $scope.delete = function (id) {
                    $scope.extras = $.grep($scope.extras, function (e) {
                        return e.id !== id;
                    });
                };

                $scope.deleteFile = function (extraId, fileId) {

                    angular.forEach($scope.extras, function (extra) {
                        if (extra.id === extraId) {
                            if (extra.files !== undefined) {
                                extra.files = $.grep(extra.files, function (file) {
                                    return file.id !== fileId;
                                });
                            }
                        }
                    });
                };
            }
        };
    });
}());