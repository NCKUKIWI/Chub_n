
var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var notify = require('gulp-notify');
 

gulp.task('scss', function () {
        return gulp.src('public/scss/*.scss')
        .pipe(changed('dist/css', {extension:'.css'}))
        .pipe(sass())
        // .pipe(gulp.dest('dist/css'))
        // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public/css'))
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }));
  });


gulp.task('default', ['scss'], function() {
    gulp.watch('public/scss/*.scss', ['scss']);
});

