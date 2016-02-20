'use strict';

var gulp   = require('gulp'),
    nano   = require('gulp-cssnano'),
    sass   = require('gulp-sass'),
    server = require('gulp-express');


////////////////////////////////////////////////////////////////////////////////
// Task configuration                                                         //
////////////////////////////////////////////////////////////////////////////////

// Process SCSS files
gulp.task('scss', function () {
    return gulp.src(['app/sass/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(nano({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(gulp.dest('public/css/'));
});

// Launches server
gulp.task('serve', ['scss'], function () {
    server.run(['app.js']);

    // Restart the server when file changes
    gulp.watch(['app/**/*', 'public/**/*'], server.notify);
    var scssWatcher = gulp.watch(['app/sass/**/*.scss'], ['scss']);
    scssWatcher.on('change', function (event) {
        server.notify(event);
    });

    gulp.watch(['app.js', 'app/routes.js'], [server.run]);
});
