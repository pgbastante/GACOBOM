(function() {
    'use strict';
    angular.module('gacobom').directive('gcbExtraContentManager', gcbExtraContentManager);

    function gcbExtraContentManager() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-extra-content-manager.html',
            scope: {
                extras: '=',
                addExtra: '&',
                title: '@',
                anchor: '@',
                url: '@'
            },
            controller: ExtraContentManagerCtrlr,
            controllerAs: 'extraCtrl'
        };
    }

    ExtraContentManagerCtrlr.$inject = ['$scope'];

    function ExtraContentManagerCtrlr($scope) {
        var vm = this;
        vm.remove = remove;
        vm.add = add;

        function remove(id) {
            $scope.extras = $.grep($scope.extras, isExtraId);

            function isExtraId(extra) {
                return extra.id !== id;
            }
        }

        function add() {
            $scope.addExtra().$promise.then(addOk);

            function addOk(res) {
                $scope.extras.push({id: res.id, name: res.name});
            }
        }
    }
}());