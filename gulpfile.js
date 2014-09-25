var gulp = require('gulp'),
    boilerplate = require('boilerplate-gulp');
boilerplate(gulp, {
    pkg: require('./package.json'),
    jsMain: './src/angular-footable.js'
});
