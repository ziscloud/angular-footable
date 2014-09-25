'use strict';

describe('example service - module test', function() {

    beforeEach(angular.mock.module('angular-footable'));

    it('should have a "example" service', inject(function($injector) {
        expect(function() { $injector.get('example'); }).not.toThrow();
    }));

});

describe('example service - unit tests', function() {
    var example;
    var $rootScope;

    beforeEach(function() {
        // mock some basic stuff
        Date.__now__ = Date.now;
        Date.now = function() {
            return 1368817912431;
        };

        angular.mock.module('angular-footable');

        inject(function(_example_, _$rootScope_) {
            example = _example_;
            $rootScope = _$rootScope_;
        });
    });

    afterEach(function() {
        Date.now = Date.__now__;

        example = null;
    });


    it('should be a function', function() {
        expect(typeof example).toBe('function');
    });

    it('should return true', function() {
        expect(example()).toBe(true);
    });

});