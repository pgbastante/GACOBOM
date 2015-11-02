(function() {
    'use strict';
    angular.module('gacobom')
        .directive('gcbSidenav', gcbSidenav);

    gcbSidenav.$inject = ['$document'];

    function gcbSidenav($document) {

        function link(scope, element) {
            scope.topOffset = angular.element(element).offset().top;
            $document.find('body').scrollspy({
                target: '#gcb-nav-group',
                offset: scope.topOffset
            });
        }

        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-sidenav.html',
            scope: {
                options: '='
            },
            link: link
        };
    }
}());