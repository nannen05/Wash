var gulp = require('gulp');
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./public/dist"
    }
  });
  gulp.watch('public/*.html', ['compress-html', browserSync.reload])
  gulp.watch('public/*.css', ['compress-css', browserSync.reload])
  gulp.watch('public/*.js', ['compress-js', browserSync.reload])
});
