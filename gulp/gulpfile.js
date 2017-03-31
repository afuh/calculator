var gulp          = require('gulp'),
    browserSync   = require('browser-sync').create(),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    babel         = require("gulp-babel"),
    plumber       = require("gulp-plumber");

gulp.task('serve', ['sass', 'babel'], function() {

    browserSync.init({
        server: "../",
        open: false
    });

    gulp.watch("../*.html").on('change', browserSync.reload);
    gulp.watch("../styles/*.s+(a|c)ss", ['sass']);
    gulp.watch("../js/*.js", ['babel']);
});

gulp.task('sass', function() {
  return gulp.src("../styles/main.sass")
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("../"))
    .pipe(browserSync.stream());
});

gulp.task('babel', function () {
  return gulp.src("../js/main.js")
    .pipe(plumber())
    .pipe(babel({
      "presets": ["babel-preset-es2015"].map(require.resolve)
    }))
    .pipe(gulp.dest("../"))
    .pipe(browserSync.stream());
});



gulp.task('default', ['serve']);