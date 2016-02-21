'use strict';

var gulp   = require('gulp'),
    nano   = require('gulp-cssnano'),
    sass   = require('gulp-sass'),
    server = require('gulp-express');


////////////////////////////////////////////////////////////////////////////////
// Task configuration                                                         //
////////////////////////////////////////////////////////////////////////////////

// TODO: clean task
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', function () {

});

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

// Compiles everything
gulp.task('build', ['scss']);

// Starts Express server and watches for file changes
gulp.task('watch', ['build', 'serve'], function () {
    server.run(['app.js']);

    gulp.watch(['app/**/*', 'public/**/*'], server.notify);
    var scssWatcher = gulp.watch(['app/sass/**/*.scss'], ['scss']);
    scssWatcher.on('change', function (event) {
        server.notify(event);
    });

    gulp.watch(['app.js', 'app/routes.js'], [server.run]);
});
