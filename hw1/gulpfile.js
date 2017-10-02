const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');


let config = {
    src: './src/',
    css: {
        watch:'precss/**/*.less',
        src: 'precss/style.less',
        dest: 'css'
    },
    html:{
        src:'*.html'
    }
};

gulp.task('preproc', function() {
    gulp.src(config.src + config.css.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gcmq())
        // .pipe(autoprefixer({
        //     browsers: ['> 0.1%'],
        //     cascade: false
        // }))
        // .pipe(cleanCSS({
        //     level: 2
        // }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.src + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: config.src
        }
        // ,tunnel:true
    });
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch(config.src + config.css.watch, ['preproc']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
});