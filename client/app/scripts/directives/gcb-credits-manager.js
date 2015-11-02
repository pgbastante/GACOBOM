(function() {
    'use strict';
    angular.module('gacobom').directive('gcbCreditsManager', gcbCreditsManager);

    function gcbCreditsManager() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-credits-manager.html',
            scope: {
                credits: '=',
                title: '@',
                anchor: '@'
            },
            controller: CreditsManagerCtrl,
            controllerAs: 'creditsCtrl'
        };
    }

    CreditsManagerCtrl.$inject = ['$scope'];

    function CreditsManagerCtrl($scope) {
        var vm = this;
        vm.remove = remove;

        function remove(roleId, personId) {
            $scope.credits = $.grep($scope.credits, removePerson);

            function removePerson(role) {
                if (role.id !== roleId) {
                    return true;
                }
                role.people = $.grep(role.people, isPersonId);
                return role.people.length !== 0;
            }

            function isPersonId(person) {
                return person.id !== personId;
            }
        }
    }
}());