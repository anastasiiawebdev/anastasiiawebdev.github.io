/* jshint node:true */
"use strict";

let gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  livereload = require('gulp-livereload'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  // cssnano = require('gulp-cssnano'),
  concat = require('gulp-concat'),
  pug = require('gulp-pug'),
  iconfont = require('gulp-iconfont'),
  watch = require('gulp-watch');

// Definitions
let source = {
 js: [
  'assets/js/toggler.min.js',
  'assets/js/list.js',
  'assets/js/script.js'
 ]
};

// Tasks
// Webserver
gulp.task('webserver', function() {
 gulp.src('./').pipe(webserver({
  open: '/build',
  livereload: true,
  directoryListing: true,
  fallback: 'index.html'
 }));
});

// Styles
gulp.task('sass', function() {
 gulp.src('assets/sass/main.sass').pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)).pipe(autoprefixer({
  browsers: ['last 10 versions'],
  cascade: false
 })).pipe(gulp.dest('build/assets/css')).pipe(livereload({start: true}));
});

// Scripts
gulp.task('scripts', function() {
 gulp.src(source.js).pipe(concat('scripts.min.js'))
 // .pipe(uglify())
   .pipe(gulp.dest('build/assets/js')).pipe(livereload({start: true}));
});

// Fonts
gulp.task('fonts', function() {
 return gulp.src('assets/fonts/*').pipe(gulp.dest('build/assets/fonts'));
});

// Pug
gulp.task('pug', function() {
 return gulp.src('*.pug').pipe(pug({
  pretty: true
 })).pipe(gulp.dest('build')).pipe(livereload({start: true}));
});

// Iconfont
gulp.task('Iconfont', function() {
 return gulp.src(['assets/img/icons/*.svg']).pipe(iconfont({
  fontName: 'iconFont',
  prependUnicode: true,
  formats: ['ttf', 'eot', 'woff', 'svg'],
  // timestamp: runTimestamp,
  normalize: true,
  fontWeight: '300',
  fontHeight: 100,
  fixedWidth: false,
  centerHorizontally: false
 })).pipe(gulp.dest('build/assets/fonts/'));
});

// images
gulp.task('images', function() {
 return gulp.src('assets/img/**/*').pipe(gulp.dest('build/assets/img/'));
});

// Watch
gulp.task('watch', function() {
 // gulp.watch(['assets/scss/*.scss'], ['sass']);
 gulp.watch(['assets/sass/*.sass'], ['sass']);
 gulp.watch(['assets/js/*.js'], ['scripts']);
 gulp.watch(['assets/img/icons/*.svg'], ['Iconfont']);
 gulp.watch(['*.pug'], ['pug']);
 gulp.watch(['assets/fonts/*.*'], ['fonts']);
 gulp.watch(['assets/img/**/*'], ['images']);
});

// Default task
gulp.task('default', [
 'pug',
 'sass',
 'scripts',
 'fonts',
 'images',
 'webserver',
 'watch']
);
