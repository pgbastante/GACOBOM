/* global Bloodhound:false */

(function() {
    'use strict';
    angular.module('gacobom')
        .directive('gcbTags', gcbTags);

    gcbTags.$inject = ['API_SETTINGS'];

    function gcbTags(API_SETTINGS) {
        function link(scope, element) {
            if (!angular.isArray(scope.model)) {
                scope.model = [];
            }

            var select = $('select', element),
                i,
                prev,
                platforms = new Bloodhound({
                    initialize: false,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    datumTokenizer: datumTokenizer,
                    prefetch: {
                        url: API_SETTINGS.API_URL + scope.prefetchUrl
                    }

                });
            platforms.clearPrefetchCache();
            platforms.initialize()
                .done(onInitDone)
                .fail(onInitFail);

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
                            suggestion: formatSuggestion
                        }
                    }],
                itemValue: scope.itemValue,
                itemText: scope.itemText
            });

            for (i = 0; i < scope.model.length; i++) {
                select.tagsinput('add', scope.model[i]);
            }

            select.on('itemAdded', onItemAdded);
            select.on('itemRemoved', onItemRemoved);

            // create a shallow copy of model's current state, needed to determine
            // diff when model changes
            prev = scope.model.slice();
            scope.$watch('model', onModelChange, true);

            function datumTokenizer(d) {
                var tokens = Bloodhound.tokenizers.whitespace(d.name);
                $.each(tokens, function(k, v) {
                    i = 0;
                    while ((i + 1) < v.length) {
                        tokens.push(v.substr(i, v.length));
                        i++;
                    }
                });
                return tokens;
            }

            function formatSuggestion(data) {
                return '<p>' + data.name + '</p>';
            }

            function onItemAdded(event) {
                if (scope.model.indexOf(event.item) === -1) {
                    scope.model.push(event.item);
                }
            }

            function onItemRemoved(event) {
                var idx = scope.model.indexOf(event.item);
                if (idx !== -1) {
                    scope.model.splice(idx, 1);
                }
            }

            function onModelChange() {
                var added = scope.model.filter(function(i) {
                        return prev.indexOf(i) === -1;
                    }),
                    removed = prev.filter(function(i) {
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
            }

            function onInitDone() {
                console.log('ready to go!');
            }

            function onInitFail() {
                console.log('err, something went wrong :(');
            }
        }

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
            link: link
        };
    }
}());

