(function() {
    'use strict';
    angular.module('gacobom').directive('gcbMedia', gcbMedia);

    function gcbMedia() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-media.html',
            scope: {
                items: '='
            },
            controller: MediaCtrl,
            controllerAs: 'mediaCtrl'
        };
    }

    MediaCtrl.$inject = ['splashService', 'API_SETTINGS'];

    function MediaCtrl(splashService, API_SETTINGS) {
        var vm = this;
        vm.open = openMediaItem;
        vm.apiUrl = API_SETTINGS.API_URL;

        function openMediaItem(item) {
            splashService.open({
                splashImage: API_SETTINGS.API_URL + item.meta.url,
                splashText: item.text
            });
        }
    }
}());