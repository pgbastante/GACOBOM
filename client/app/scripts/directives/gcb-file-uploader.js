/*global angular */

(function () {
    "use strict";
    angular.module('gacobom').directive("gcbFileUploader", ['flowFactory', function (flowFactory) {
        return {
            restrict: "E",
            templateUrl: "views/directives/gcb-file-uploader.html",
            scope: {
                uploadTo: '@',
                onFileUpload: '&onFileSuccess'
            },
            controller: function ($scope) {
                $scope.getFileStatus = function (file) {
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
                $scope.$flow = flowFactory.create({target: $scope.uploadTo, testChunks: false});
            }
        };
    }]);
}());