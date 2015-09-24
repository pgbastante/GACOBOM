/*global angular */

(function () {
    "use strict";

    angular.module('gacobom').factory('commonFactory', ['$http', function ($http) {
        var commonFactory = {};

        commonFactory.getMediaCount = function () {
            return $http.get('/count');
        };

        return commonFactory;
    }]);


}());