(function() {
    'use strict';
    angular.module('ui.splash', ['ui.bootstrap'])
        .service('splashService', ['$modal', '$rootScope', splashService]);

    function splashService($modal, $rootScope) {
        return {
            open: function(attrs, opts) {
                var scope = $rootScope.$new();
                angular.extend(scope, attrs);
                opts = angular.extend(opts || {}, {
                    backdrop: false,
                    templateUrl: 'scripts/splash/splash-content.html',
                    windowTemplateUrl: 'scripts/splash/splash.html',
                    scope: scope
                });
                return $modal.open(opts);
            }
        };
    }
}());