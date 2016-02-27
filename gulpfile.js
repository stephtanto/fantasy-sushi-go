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
  del.sync(['client/css/**']);
  done();
});

// Run JSCS on all JS code
gulp.task('lint:js', function () {
  return gulp.src(['{server,client/js}/**/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter());
});

// Process SCSS files
gulp.task('scss', function () {
  return gulp.src(['styles/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(gulp.dest('client/css/'));
});

// Lints and compiles everything
gulp.task('build', ['clean', 'lint:js', 'scss']);

// Starts Express server and watches for file changes
gulp.task('watch', ['build'], function () {
  server.run(['server.js']);

  gulp.watch(['{server,client}/**/*'], server.notify);

  var scssWatcher = gulp.watch(['server/styles/**/*.scss'], ['scss']);
  scssWatcher.on('change', function (event) {
    server.notify(event);
  });

  gulp.watch(['{server,client/js}/**/*.js'], ['lint:js']);

  gulp.watch(['server.js', 'server/routes.js'], [server.run]);
});
