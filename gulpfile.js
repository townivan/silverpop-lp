// dependencies
var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();


// tasks
gulp.task('sass', function(){
  return gulp.src('app/styles/site.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/')) // save normal .css file here
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))  // minifiy css
    .pipe(rename({suffix: '.min'})) // add the .min into the name of the minified css file
    .pipe(gulp.dest('app/')) // save minified css here
    .pipe(browserSync.stream()); // reload AFTER compile
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});


// watch tasks
gulp.task('mywatch', function(){
	gulp.watch('app/**/*.+(js|scss)', ['sass']) // this calls browserSync.reload after the compile
	gulp.watch('app/**/*.html', [browserSync.reload])  // no need to compile first, so reload immediately
})


// default task
gulp.task('default',['sass', 'mywatch', 'browser-sync'])