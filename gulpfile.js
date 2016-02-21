'use strict';

var del    = require('del'),
    gulp   = require('gulp'),
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
gulp.task('build', ['clean', 'scss']);

// Starts Express server and watches for file changes
gulp.task('watch', ['build'], function () {
    server.run(['app.js']);

    gulp.watch(['app/**/*', 'public/**/*'], server.notify);
    var scssWatcher = gulp.watch(['app/sass/**/*.scss'], ['scss']);
    scssWatcher.on('change', function (event) {
        server.notify(event);
    });

    gulp.watch(['app.js', 'app/routes.js'], [server.run]);
});
