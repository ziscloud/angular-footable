angular
    .module('angular-footable-example', [
        'angular-footable'
    ])
    .controller('exampleCtrl', function($scope, example) {
        $scope.exampleResult = example();
    });