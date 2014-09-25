angular
    .module('angular-footable-example', [
        'angular-footable.example'
    ])
    .controller('exampleCtrl', function($scope, example) {
        $scope.exampleResult = example();
    });