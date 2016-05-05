var gulp = require('gulp');

var rename = require('gulp-rename');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
	scripts: ['src/*.js'],
};
var bases = {
	dist: 'dist'
};
gulp.task('clean', function(){
	return gulp.src(bases.dist+'/*.js', {read:false})
	.pipe(clean());
});
gulp.task('scripts', ['clean'], function(){
	gulp.src(paths.scripts)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest(bases.dist))
	.pipe(uglify())
	.pipe(rename({
      extname: '.min.js'
    }))
	.pipe(gulp.dest(bases.dist));
});
gulp.task('default',['scripts']);