/*global angular */
/*global $*/

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbExtraContentManager", function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-extra-content-manager.html",
            scope: {
                extras: "=",
                addExtra: "&",
                title: "@",
                anchor: "@",
                url: "@"
            },
            controller: function ($scope) {
                $scope.delete = function (id) {
                    $scope.extras = $.grep($scope.extras, function (e) {
                        return e.id !== id;
                    });
                };

                $scope.addExtraItem = function () {
                    $scope.addExtra().$promise.then(function (res) {
                        $scope.extras.push({id: res.id, name: res.name});
                    });
                };
            }
        };
    });
}());