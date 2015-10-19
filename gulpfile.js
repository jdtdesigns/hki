///// Plugin Includes /////
var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		plumber = require('gulp-plumber'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint'),
		prefix = require('gulp-autoprefixer'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		sass = require('gulp-sass');

///// Compile/Validate JS /////
gulp.task('js', function () {
	gulp.src('./js/app.js')
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('default', { verbose: true }))
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./js/dist/'))
});

///// Compile Sass /////
gulp.task('sass', function () {
	return gulp.src('./scss/style.scss')
	.pipe(plumber())
	.pipe(sass().on('error', sass.logError))
	.pipe(sass( {outputStyle: 'compressed'} ))
	.pipe(prefix('last 2 versions'))
	.pipe(gulp.dest('./css/'))
});

///// Get HTML /////
gulp.task('html', function () {
	gulp.src('./*.html')
	.pipe(gulp.dest('./'))
});

///// Browser Sync /////
gulp.task('browser-sync', function () {
	browserSync.init({
		files: ["./css/style.css", "./js/dist/*.js", './*.html'],
		server: {
            baseDir: "./"
        },
		notify: false
	});
});

///// Watch Task /////
gulp.task('watch', function () {
	gulp.watch('js/app.js', ['js']);
	gulp.watch('./scss/**/*.scss', ['sass']);
	gulp.watch('./*.html', ['html']);
});

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['browser-sync', 'watch']);



