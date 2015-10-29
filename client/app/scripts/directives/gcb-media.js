(function() {
    'use strict';
    angular.module('gacobom').directive('gcbMedia', ['API_SETTINGS', 'splashService', gcbMedia]);

    function gcbMedia(API_SETTINGS, splashService) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-media.html',
            scope: {
                items: '='
            },
            controller: function($scope) {
                var vm = this;
                vm.open = openMediaItem;

                function openMediaItem(item) {
                    splashService.open({
                        splashImage: API_SETTINGS.API_URL + item.meta.url,
                        splashText: item.text
                    });
                }
            },
            controllerAs: 'mediaCtrl',
            link: function(scope) {
                scope.apiUrl = API_SETTINGS.API_URL;
            }
        };
    }
}());