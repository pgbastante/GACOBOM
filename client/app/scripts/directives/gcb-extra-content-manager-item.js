(function() {
    'use strict';
    angular.module('gacobom').directive('gcbExtraContentManagerItem', [gcbExtraContentManagerItem]);

    function gcbExtraContentManagerItem() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-extra-content-manager-item.html',
            scope: {
                item: '=',
                url: '@'
            },
            require: '^gcbExtraContentManager',
            controller: function($scope) {
                var vm = this;
                vm.deleteFile = deleteFile;
                vm.onFileUpload = onFileUpload;

                function deleteFile(fileId) {
                    $scope.item.files = $.grep($scope.item.files, isFileId);

                    function isFileId(file) {
                        return file.id !== fileId;
                    }
                }

                function onFileUpload(file, message, flow) {
                    if ($scope.item.files === undefined) {
                        $scope.item.files = [];
                    }
                    $scope.item.files.push(JSON.parse(message));
                }
            },
            controllerAs: 'extraItemCtrl'
        };

    }
}());