(function() {
    'use strict';
    angular.module('gacobom').directive('gcbCover', gcbCover);

    function gcbCover() {
        function link(scope) {
            scope.imageUrl = scope.url + '/cover';
        }

        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-cover.html',
            scope: {
                url: '@'
            },
            controller: CoverCtrl,
            controllerAs: 'cover',
            link: link
        };
    }

    CoverCtrl.$inject = ['$scope', 'splashService'];

    function CoverCtrl($scope, splashService) {
        var vm = this;
        vm.open = openSplash;

        function openSplash() {
            splashService.open({
                splashImage: $scope.url + '/cover'
            });
        }
    }

}());