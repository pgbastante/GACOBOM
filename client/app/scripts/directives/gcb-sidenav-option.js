(function() {
    'use strict';
    angular.module('gacobom')
        .directive('gcbSideNavOption', gcbSideNavOption);

    function gcbSideNavOption() {
        function link(scope, element) {
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

        return {
            restrict: 'A',
            link: link
        };
    }
}());