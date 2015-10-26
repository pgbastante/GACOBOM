/*global angular */
/*global $*/

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbCreditsManager", [function () {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-credits-manager.html",
            scope: {
                credits: "=",
                title: "@",
                anchor: "@"
            },
            controller: function ($scope) {
                $scope.delete = function (roleId, personId) {
                    $scope.credits = $.grep($scope.credits, function (role) {
                        if (role.id !== roleId) {
                            return true;
                        }
                        role.people = $.grep(role.people, function (person) {
                            return person.id !== personId;
                        });
                        return role.people.length !== 0;
                    });
                };
            }
        };
    }]);
}());