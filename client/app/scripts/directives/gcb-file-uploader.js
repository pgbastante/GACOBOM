(function() {
    'use strict';
    angular.module('gacobom').directive('gcbFileUploader', ['flowFactory', gcbFileUploader]);

    function gcbFileUploader(flowFactory) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-file-uploader.html',
            scope: {
                uploadTo: '@',
                onFileUpload: '&onFileSuccess'
            },
            controller: function($scope) {
                var vm = this;
                vm.getFileStatus = getFileStatus;
                vm.$flow = flowFactory.create({target: $scope.uploadTo, testChunks: false});

                function getFileStatus(file) {
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
                }
            },
            controllerAs: 'uploaderCtrl'

        };
    }
}());