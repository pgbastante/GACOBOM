/*global angular */
/*global $*/
/*global Bloodhound*/
(function () {
    "use strict";
    angular.module('gacobom')
        .directive('gcbTags', ['API_SETTINGS', function (API_SETTINGS) {
            return {
                restrict: 'E',
                scope: {
                    model: '=',
                    prefetchUrl: '@',
                    itemValue: '@',
                    itemText: '@',
                    displayKey: '@'
                },
                template: '<select multiple></select>',
                replace: false,
                link: function (scope, element) {
                    $(function () {
                        if (!angular.isArray(scope.model)) {
                            scope.model = [];
                        }

                        var select = $('select', element),
                            i,
                            prev,
                            platforms = new Bloodhound({
                                initialize: false,
                                queryTokenizer: Bloodhound.tokenizers.whitespace,
                                datumTokenizer: function (d) {
                                    var test = Bloodhound.tokenizers.whitespace(d.name);
                                    $.each(test, function (k, v) {
                                        i = 0;
                                        while ((i + 1) < v.length) {
                                            test.push(v.substr(i, v.length));
                                            i++;
                                        }
                                    });
                                    return test;
                                },
                                prefetch: {
                                    url: API_SETTINGS.API_URL + scope.prefetchUrl
                                }

                            });
                        platforms.clearPrefetchCache();
                        platforms.initialize()
                            .done(function () {
                                console.log('ready to go!');
                            })
                            .fail(function () {
                                console.log('err, something went wrong :(');
                            });

                        select.tagsinput({
                            typeaheadjs: [
                                {
                                    hint: false,
                                    highlight: true,
                                    minLength: 1
                                }, {
                                    source: platforms,
                                    displayKey: scope.displayKey,
                                    templates: {
                                        suggestion: function (data) {
                                            return '<p>' + data.name + '</p>';
                                        }
                                    }
                                }],
                            itemValue: scope.itemValue,
                            itemText: scope.itemText
                        });

                        for (i = 0; i < scope.model.length; i++) {
                            select.tagsinput('add', scope.model[i]);
                        }

                        select.on('itemAdded', function (event) {
                            if (scope.model.indexOf(event.item) === -1) {
                                scope.model.push(event.item);
                            }
                        });

                        select.on('itemRemoved', function (event) {
                            var idx = scope.model.indexOf(event.item);
                            if (idx !== -1) {
                                scope.model.splice(idx, 1);
                            }
                        });

                        // create a shallow copy of model's current state, needed to determine
                        // diff when model changes
                        prev = scope.model.slice();
                        scope.$watch("model", function () {
                            var added = scope.model.filter(function (i) {
                                    return prev.indexOf(i) === -1;
                                }),
                                removed = prev.filter(function (i) {
                                    return scope.model.indexOf(i) === -1;
                                });

                            prev = scope.model.slice();

                            // Remove tags no longer in binded model
                            for (i = 0; i < removed.length; i++) {
                                select.tagsinput('remove', removed[i]);
                            }

                            // Refresh remaining tags
                            select.tagsinput('refresh');

                            // Add new items in model as tags
                            for (i = 0; i < added.length; i++) {
                                select.tagsinput('add', added[i]);
                            }
                        }, true);
                    });

                }
            };
        }]);

}());

