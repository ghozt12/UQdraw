var gulp = require('gulp');
var scss = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var del = require('del');
var concat_css = require("gulp-concat-css");
var autoprefixer = require('gulp-autoprefixer');

// Tasks

// (1) Convert SCSS
gulp.task('sass-to-css', function() {
    gulp.src('css/scss/**/*.scss')
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./css/'));    
});

gulp.task('default', function() {
    gulp.watch('css/scss/**/*.scss',['sass-to-css']);
});
