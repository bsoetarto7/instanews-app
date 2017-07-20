// Required Packages
var gulp          = require('gulp'),
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    watch         = require('gulp-watch'),
    browserSync   = require('browser-sync').create(),
    eslint        = require('gulp-eslint');

// Minifying javascript files
gulp.task('scripts', function(){
  gulp.src('./js/*.js')
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('./build/js'))
});
// Lint task for checking 
gulp.task('lint', function(){
  return gulp.src(['./js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
// Initializing server for browser and reloading browser after every change in *.min.js files
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('build/js/*.js').on('change',browserSync.reload);
});
// Watch task to minify javascript
gulp.task('watch', function() {
   gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default',['watch','browser-sync']);