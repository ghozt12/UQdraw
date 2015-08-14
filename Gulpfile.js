var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var coffee = require("gulp-coffee");
var uglify = require("gulp-uglify");

// TASKS

	// -- SASS
	// Converts SASS and makes a min and normal css file
gulp.task('styles', function() {
	gulp.src('sass/**/*.sass')
    	.pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./css/'));
});

	// -- COFFEE SCRIPT
	// Converts the coffeescript to js
gulp.task('compile-coffee', function () {
    gulp.src('./coffee/*.coffee') // path to your file
    .pipe(coffee())
    .pipe(gulp.dest('./js/')) // Destination
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./js/')); // Destination of min file
});

	// -- DEFAULT
	// Type watch in the terminal and it will automatically convert sass to css
gulp.task('default', function() {
    gulp.watch('sass/**/*.sass',['styles']);
    gulp.watch('coffee/**/*.coffee',['compile-coffee']);
});
