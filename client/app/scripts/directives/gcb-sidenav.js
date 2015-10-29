(function() {
    'use strict';
    angular.module('gacobom')
        .directive('gcbSidenav', ['$document', gcbSidenav])
        .directive('gcbSideNavOption', [gcbSideNavOption]);

    function gcbSidenav($document) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-sidenav.html',
            scope: {
                options: '='
            },
            link: function(scope, element) {
                scope.topOffset = angular.element(element).offset().top;
                $document.find('body').scrollspy({
                    target: '#gcb-nav-group',
                    offset: scope.topOffset
                });
            }
        };
    }

    function gcbSideNavOption() {
        return {
            restrict: 'A',
            link: function(scope, element) {

                angular.element(element).on('click', function(e) {
                    e.preventDefault();
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - scope.topOffset
                        }, 1000);
                        return false;
                    }
                    return true;
                });

            }
        };
    }
}());