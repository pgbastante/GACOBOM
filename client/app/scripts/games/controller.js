/*global angular */
/*global $*/
(function () {
    "use strict";
    angular.module('gacobom')
        .controller('GamesListCtrl', ['gamesFactory', function (gamesFactory) {
            var ctrlr = this;

            function listGames() {
                ctrlr.list = gamesFactory.query(function (data) {
                    ctrlr.mediaCount = data.length;
                });
            }

            listGames();

        }])
        .controller('GameCtrl', ['$routeParams', 'gamesFactory', function ($routeParams, gamesFactory) {
            var ctrlr = this;

            function getGame() {
                ctrlr.data = gamesFactory.get({id: $routeParams.id});
            }


            getGame();
        }])
        .controller('GameEditCtrl', ['$routeParams', 'gamesFactory', function ($routeParams, gamesFactory) {
            var ctrlr = this;

            ctrlr.data = gamesFactory.get({id: $routeParams.id}, function (game) {
                ctrlr.mediaFiles = $.merge(game.media, game.artwork);
                ctrlr.extras = $.merge($.merge(game.versions, game.trivia), game.cheats);
            });

            ctrlr.getFileStatus = function (file) {
                if (file.error) {
                    return 'Error';
                }
                if (file.isComplete()) {
                    return 'Complete';
                }
                if (file.isUploading()) {
                    return 'Uploading';
                }
                return 'Paused';
            };

            ctrlr.onFileUpload = function ($file, $message) {
                ctrlr.mediaFiles.push(JSON.parse($message));
            };

            ctrlr.addMedia = false;

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


