var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

//gulp.task('test', function() {
//    return gulp.src('test.js', {read: false})
//    .pipe(mocha({reporter: 'nyan'}));
//});

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    ext: 'js'
  })
      .on('start', ['browser-sync'])
      .on('change' , function() {
        console.log("Changed")
      })
      .on('restart', function() {
        console.log('Restarted');
      })
});

gulp.task('default', ['nodemon']);

require('require-dir')('./gulp');