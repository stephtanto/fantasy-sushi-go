'use strict';

var del  = require('del'),
  gulp   = require('gulp'),
  jscs   = require('gulp-jscs'),
  nano   = require('gulp-cssnano'),
  sass   = require('gulp-sass'),
  server = require('gulp-express');


////////////////////////////////////////////////////////////////////////////////
// Task configuration                                                         //
////////////////////////////////////////////////////////////////////////////////

// Removes previously compiled files
gulp.task('clean', function (done) {
  del.sync(['public/css/**']);
  done();
});

// Run JSCS on all JS code
gulp.task('lint:js', function () {
  return gulp.src(['app/**/*.js', 'public/js/**/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter());
});

// Process SCSS files
gulp.task('scss', function () {
  return gulp.src(['app/styles/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(gulp.dest('public/css/'));
});

// Lints and compiles everything
gulp.task('build', ['clean', 'lint:js', 'scss']);

// Starts Express server and watches for file changes
gulp.task('watch', ['build'], function () {
  server.run(['app.js']);

  gulp.watch(['{app,public}/**/*'], server.notify);
  var scssWatcher = gulp.watch(['app/styles/**/*.scss'], ['scss']);
  scssWatcher.on('change', function (event) {
    server.notify(event);
  });

  gulp.watch(['app.js', 'app/routes.js'], [server.run]);
});
