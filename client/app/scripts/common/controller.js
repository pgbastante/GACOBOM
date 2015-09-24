/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').controller('commonCtrl', ['commonFactory', function (commonFactoy) {
        var ctrlr = this;

        function getCounters() {
            commonFactoy.getMediaCount().success(function (data) {
                ctrlr.gameCount = data.games;
                ctrlr.comicCount = data.comics;
                ctrlr.bookCount = data.books;
            }).catch(function () {
                ctrlr.gameCount = '?';
                ctrlr.comicCount = '?';
                ctrlr.bookCount = '?';
            });
        }

        getCounters();

    }]);

}());
