const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');

gulp.task('css', function () {
    return gulp
           .src('./src/_sass/site.sass')
           .pipe(sass())
           .pipe(autoprefixer())
           .pipe(cssnano())
           .pipe(rename('style.css'))
           .on('error', sass.logError)
           .pipe(gulp.dest('./src/assets/css/'))
})

gulp.task('watch', function () {
    gulp.watch('./src/_sass/*.sass', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css'))