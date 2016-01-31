'use strict';

var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    server = require('gulp-express');


////////////////////////////////////////////////////////////////////////////////
// Task configuration                                                         //
////////////////////////////////////////////////////////////////////////////////

// Process SCSS files
gulp.task('scss', function () {
    return gulp.src(['app/sass/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

// Launches server
gulp.task('server', ['scss'], function () {
    server.run(['app.js']);

    // Restart the server when file changes
    gulp.watch(['app/**/*', 'public/**/*'], server.notify);
    gulp.watch(['app/sass/**/*.scss'], function (event) {
        gulp.run('scss');
        server.notify(event);
    });

    gulp.watch(['app.js', 'app/routes.js'], [server.run]);
});
