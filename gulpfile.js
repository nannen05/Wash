var gulp = require("gulp");
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('watch', function() {
  gulp.watch('app.js.js', function(){
    console.log('server changed');
  });

});

gulp.task('test', function() {
    return gulp.src('test.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    ext: 'js'
  })
      .on('start' , function(){
        console.log('Started Firing')
      })
      .on('change' , function() {
        console.log("Changed")
      })
      .on('restart', function() {
        console.log('Restarted');
      })
});

gulp.task('default', ['nodemon','test', 'watch']);