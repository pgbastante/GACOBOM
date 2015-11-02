(function() {
    'use strict';
    angular.module('gacobom').directive('gcbFileUploader', gcbFileUploader);

    function gcbFileUploader() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/gcb-file-uploader.html',
            scope: {
                uploadTo: '@',
                onFileUpload: '&onFileSuccess'
            },
            controller: FileUploaderCtrl,
            controllerAs: 'uploaderCtrl'
        };
    }

    FileUploaderCtrl.$inject = ['$scope', 'flowFactory'];

    function FileUploaderCtrl($scope, flowFactory) {
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
    }
}());