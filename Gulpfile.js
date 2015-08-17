var gulp = require('gulp');
var scss = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var del = require('del');
var concat_css = require("gulp-concat-css");

// Tasks

// (1) Convert SCSS
gulp.task('sass-to-css', function() {
    gulp.src('css/scss/**/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./css/'));    
});

// I will fix this up later -rhain
/* (2) Compress CSS
gulp.task('css-minify', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'));
});

// (3) Create Dist folder
gulp.task('copy', function() {
    // Copy html
    gulp.src('index.html')
        .pipe(gulp.dest('dist/'));

    // Copy Assets
    gulp.src('assets/**', {cwd: './'})
        .pipe(gulp.dest('dist/'));
    
    // Copy all HTML pages
    gulp.src('pages/*.html')
        .pipe(gulp.dest('dist/pages/'));
});
*/
// (4) Watch
// gulp.task('production', ['sass-to-css', 'css-minify', 'copy']);

// (5) Default
gulp.task('default', function() {
    gulp.watch('css/scss/**/*.scss',['sass-to-css']);
});
