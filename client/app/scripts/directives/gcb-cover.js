(function() {
    'use strict';
    angular.module('gacobom').directive('gcbCover', ['splashService', gcbCover]);

    function gcbCover(splashService) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-cover.html',
            scope: {
                url: '@'
            },
            controller: function($scope) {
                var vm = this;
                vm.open = openSplash;

                function openSplash() {
                    splashService.open({
                        splashImage: $scope.url + '/cover'
                    });
                }
            },
            controllerAs: 'cover',
            link: function(scope) {
                scope.imageUrl = scope.url + '/cover';
            }
        };
    }

}());