var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var coffeescript = require('gulp-coffeescript');


gulp.task('sass', function(){
    return gulp.src('public/sass/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('public/stylesheets'))

});

gulp.task('coffee', function() {
    gulp.src('./public/*.coffee')
        .pipe(coffeescript({bare: true}))
        .pipe(gulp.dest('./public/javascripts'))
});

gulp.task('watch', function (){
    gulp.watch('public/sass/*.scss', ['sass']);
    gulp.watch('public/*.coffee',['coffee'])
    // Other watchers
});



