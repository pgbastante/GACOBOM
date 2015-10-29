(function() {
    'use strict';
    angular.module('gacobom').directive('gcbMediaManager', [gcbMediaManager]);

    function gcbMediaManager() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-media-manager.html',
            scope: {
                mediaFiles: '=',
                url: '@',
                uploadVisibility: '=',
                title: '@',
                anchor: '@'
            },
            controller: function($scope) {
                var vm = this;
                vm.remove = remove;
                vm.uploadVisibility = false;
                vm.onMediaUpload = onMediaUpload;

                function remove(id) {
                    $scope.mediaFiles = $.grep($scope.mediaFiles, isMediaId);

                    function isMediaId(e) {
                        return e.id !== id;
                    }
                }

                function onMediaUpload(file, message, flow) {
                    $scope.mediaFiles.push(JSON.parse(message));
                }
            },
            controllerAs: 'mediaCtrl'
        };
    }
}());