(function() {
    'use strict';
    angular.module('gacobom').controller('topNavController', [
        'topNavFactory', function(topNavFactory) {
            var vm = this;
            topNavFactory.getElementCount().success(function(data) {
                vm.gameCount = data.games;
                vm.comicCount = data.comics;
                vm.bookCount = data.books;
            }).catch(function() {
                vm.gameCount = '?';
                vm.comicCount = '?';
                vm.bookCount = '?';
            });
        }]);
}());