var gulp = require('gulp');
var scss = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var coffee = require("gulp-coffee");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var clean = require("gulp-clean");

// TASKS

	// -- scss
	// Converts scss and makes a min and normal css file
    // Also concats any css
gulp.task('styles', function() {
	gulp.src('scss/**/*.scss')
    	.pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest('./css/'))    
});

gulp.task('concatCSS', function() {
    gulp.src('css/**/*.css')
        .pipe(concat('concat.js'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./css/'));
});

	// -- COFFEE SCRIPT
	// Converts the coffeescript to js
gulp.task('compile-coffee', function () {
    gulp.src('./coffee/*.coffee') // path to your file
    .pipe(coffee())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./js/')); // Destination of min file
});

    // -- COPY
    // Sends all files to the dist folder 
gulp.task('copy', function() {
    // Copy html
    gulp.src('index.html')
        .pipe(gulp.dest('dist/'));

    // Copy js
    gulp.src('js/*.min.js')
        .pipe(gulp.dest('dist/'));

    // Copy css
    gulp.src('css/*.min.css')
        .pipe(gulp.dest('dist/'));
});

// Delete the dist directory
gulp.task('clean', function() {
    return gulp.src('dist/')
        .pipe(clean());
});

	// -- DEFAULT
	// Type watch in the terminal and it will automatically convert scss to css
gulp.task('default', function() {
    gulp.watch('scss/**/*.scss',['styles', 'concatCSS', 'copy']);
    gulp.watch('*.html',['copy']);
    gulp.watch('coffee/**/*.coffee',['compile-coffee', 'copy']);
});

    // -- PRODUCTION
    // -- DEFAULT
    // Type watch in the terminal and it will automatically convert scss to css
gulp.task('production', ['styles', 'concatCSS', 'compile-coffee', 'copy']);

