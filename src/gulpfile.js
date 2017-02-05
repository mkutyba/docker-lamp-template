var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

// SASS tasks
var sass_paths = [
    './css/style-example1.scss',
    './css/style-example2.scss'
];

gulp.task('sass', function () {
    return gulp
        .src(sass_paths)
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({stream: true, match: '**/*.css'}));
});

// JS-MIN task - minify and merge JS files
var js_paths = [
    './js/scripts-example1.js',
    './js/scripts-example2.js'
];
var js_path_merged = './js/';

gulp.task('js-min', function () {
    return gulp
        .src(js_paths)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(js_path_merged))
        .pipe(browserSync.reload({stream: true}))
});

// BrowserSync
gulp.task('browser-sync', function () {
    browserSync({
        proxy: "php",
        port: 8080
    });
});

// Watch task
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('./css/**/*.scss', {
        debounceDelay: 2000
    }, ['sass']);

    // Watch .js files
    gulp.watch(js_paths, ['js-min']);
});

// Default task
gulp.task('default', ['sass', 'js-min', 'browser-sync', 'watch'], function () {
});
