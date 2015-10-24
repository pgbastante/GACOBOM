/*global angular */
/*global $*/
(function () {
    "use strict";
    angular.module('gacobom')
        .controller('GamesListCtrl', ['gamesFactory', function (gamesFactory) {
            var ctrlr = this;
            ctrlr.list = gamesFactory.query(function (data) {
                ctrlr.mediaCount = data.length;
            });
        }])
        .controller('GameCtrl', ['$routeParams', 'gamesFactory', 'API_SETTINGS', function ($routeParams, gamesFactory, API_SETTINGS) {
            var ctrlr = this;
            ctrlr.url = API_SETTINGS.API_URL + '/games/' + $routeParams.id;
            ctrlr.data = gamesFactory.get({id: $routeParams.id});
        }])
        .controller('GameEditCtrl', ['$routeParams', 'gamesFactory', 'API_SETTINGS', function ($routeParams, gamesFactory, API_SETTINGS) {
            var ctrlr = this;

            ctrlr.url = API_SETTINGS.API_URL + '/games/' + $routeParams.id;

            ctrlr.data = gamesFactory.get({id: $routeParams.id}, function (game) {
                ctrlr.mediaFiles = $.merge(game.media, game.artwork);
                ctrlr.extras = $.merge($.merge(game.versions, game.trivia), game.cheats);
            });

            ctrlr.uploadVisibility = false;

            $('#sidebar').find('a').on('click', function (e) {
                e.preventDefault();
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 50
                    }, 1000);
                    return false;
                }
                return true;
            });

            /* activate scrollspy menu */
            var $body = $(document.body);
            var navHeight = $('.navbar').outerHeight(true) + 10;

            $body.scrollspy({
                target: '#leftCol',
                offset: navHeight
            });

        }]);
}());


