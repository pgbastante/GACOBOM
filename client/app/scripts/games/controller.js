(function() {
    'use strict';
    angular.module('gacobom')
        .controller('GamesListCtrl', GamesListCtrl)
        .controller('GameCtrl', GameCtrl)
        .controller('GameEditCtrl', GameEditCtrl);

    GamesListCtrl.$inject = ['gamesFactory'];

    function GamesListCtrl(gamesFactory) {
        var vm = this;
        vm.list = gamesFactory.query(updateElementCount);

        function updateElementCount(data) {
            vm.elementCount = data.length;
        }
    }

    GameCtrl.$inject = ['$routeParams', 'gamesFactory', 'API_SETTINGS'];

    function GameCtrl($routeParams, gamesFactory, API_SETTINGS) {
        var vm = this;
        vm.url = API_SETTINGS.API_URL + '/games/' + $routeParams.id;
        vm.data = gamesFactory.get({id: $routeParams.id});
    }

    GameEditCtrl.$inject = ['$routeParams', 'gamesFactory', 'gamesExtrasFactory', 'API_SETTINGS'];

    function GameEditCtrl($routeParams, gamesFactory, gamesExtrasFactory, API_SETTINGS) {
        var vm = this;

        vm.url = API_SETTINGS.API_URL + '/games/' + $routeParams.id;

        vm.data = gamesFactory.get({id: $routeParams.id}, function(game) {
            vm.mediaFiles = $.merge(game.media, game.artwork);
            vm.extras = $.merge($.merge(game.versions, game.trivia), game.cheats);
        });

        vm.options = [
            {
                key: 'general',
                name: 'General Game Info'
            }, {
                key: 'media',
                name: 'Media Files'
            }, {
                key: 'credits',
                name: 'Credits'
            }, {
                key: 'extra',
                name: 'Extra Information'
            }];

        vm.addExtra = function() {
            return gamesExtrasFactory.save({gameId: $routeParams.id});
        };
    }
}());