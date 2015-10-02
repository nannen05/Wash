var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
  browserSync.init({
    server: "./public"
  });
  gulp.watch("public/*").on('change', browserSync.reload);
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
      //.on('start', ['test'])
      .on('start', function() {
        console.log('Started')
      })
      //.on('restart', ['browser-sync'])
      .on('change' , function() {
        console.log("Changed")
      })
      .on('restart', function() {
        console.log('Restarted');
      })
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "http://localhost:1339"
  });
});

gulp.task('compress-html', function() {
  return gulp.src('public/*.html')
      .pipe(minifyHTML())
      .pipe(gulp.dest('public/dist'));
});

gulp.task('compress-js', function() {
  return gulp.src('public/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('public/dist'));
});

gulp.task('compress-css', function() {
  return gulp.src('public/*.css')
      .pipe(minifyCss())
      .pipe(gulp.dest('public/dist'));
});

gulp.task('compress-images', function() {
  return gulp.src('public/images/*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('public/dist/images'));
});

gulp.task('compress-uploads', function() {
  return gulp.src('public/uploads/*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('public/dist/uploads'));
});

gulp.task('default', ['nodemon','watch', 'compress-html', 'compress-css', 'compress-js', 'compress-images', 'compress-uploads']);