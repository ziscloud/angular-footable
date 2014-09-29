'use strict';

angular
    .module('angular-footable-example', [
        'ui.footable'
    ])
    .controller('exampleCtrl', function($scope) {
        $scope.clearFilter = function() {
            $('.filter-status').val('');
            $('.footable').trigger('footable_clear_filter');
        };

        $scope.filteringEventHandler = function(e) {
            var selected = $('.filter-status').find(':selected').text();
            if (selected && selected.length > 0) {
                e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected : selected;
                e.clear = !e.filter;
            }
        };

        $scope.filterByStatus = function() {
            $('.footable').trigger('footable_filter', {
                filter: $('#filter').val()
            });
        };

        $scope.filter = {
            status: null
        };
    });
