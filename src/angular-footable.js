angular
    .module('angular-footable', [ ])
    .factory('example', function($rootScope) {
        return function() {
            $rootScope.example = true;

            return true;
        };
    });
