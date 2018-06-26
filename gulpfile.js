var       gulp = require('gulp'),
  gulpSequence = require('gulp-sequence')
             $ = require('gulp-load-plugins')(),
	 browserSync = require('browser-sync'),
           del = require('del'),
        concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate');

//User Related Gulp Tasks
var paths = {
    config:'config.json',
    html:[
        './client/*.html',
        './client/templates/*.html',
        './client/img/*'
    ],
    fonts:[
        './bower_components/bootstrap/dist/fonts/*'
    ],
    css:[
        './bower_components/bootstrap/dist/css/bootstrap.css',
        './client/css/*.css'
    ],
    jsLibs:[
        './bower_components/angular/angular.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
    ],
    jsApp:[
        './client/js/*.js'
    ]
}
gulp.task('clean', function (cb) {
  return del(['build/'], cb);
});
gulp.task('config', function () {
  return gulp.src(paths.config)
    .pipe(gulp.dest('build'))
  ;
});
gulp.task('html', function () {
  return gulp.src(paths.html, {
    base: './client/'
  })
    .pipe(gulp.dest('build'))
  ;
});
gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('build/fonts'))
  ;
});
gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(concat('app.css'))
    .pipe($.cssmin())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream:true }));
});
gulp.task('libs', function () {
  return gulp.src(paths.jsLibs)
  .pipe($.sourcemaps.init())
    .pipe(concat('libs.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});
gulp.task('libs-build', function () {
  return gulp.src(paths.jsLibs)
    .pipe(concat('libs.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));
});
gulp.task('app', function () {
  return gulp.src(paths.jsApp)
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));
});
gulp.task('reload', function () {
    browserSync.reload();
});
gulp.task('run', function () {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
  //Watch Config JSON changes
  gulp.watch(paths.config, ['config', 'reload']);
  //Watch CSS changes
  gulp.watch(paths.css, ['css']);
  //Watch HTML changes
  gulp.watch(paths.html, ['html', 'reload']);
  //Watch JS changes
  gulp.watch(paths.jsApp, ['app', 'reload']);
});

gulp.task('default', gulpSequence('clean', 'config', 'html', 'fonts','css', 'libs', 'app', 'run'));
gulp.task('build', gulpSequence('clean', 'config', 'html', 'fonts', 'css', 'libs-build', 'app'));
