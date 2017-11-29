var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var coffeescript = require('gulp-coffeescript');
var livereload = require('gulp-livereload');

gulp.task('sass', function(){
    return gulp.src('public/sass/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(livereload());

});
gulp.task('coffee', function() {
    gulp.src('./public/coffeescripts/*.coffee')
        .pipe(coffeescript({bare: true}))
        .pipe(gulp.dest('./public/javascripts'))
        .pipe(livereload());
});

gulp.task('watch', function (){
    livereload.listen();
    gulp.watch('public/sass/*.scss', ['sass']);
    gulp.watch('public/coffeescripts/*.coffee',['coffee'])

    // Other watchers
});



