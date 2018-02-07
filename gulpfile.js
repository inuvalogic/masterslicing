var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var src = {
    sass: [
        'resources/scss/style.scss',
    ],
    js: [
        'resources/js/*.js'
    ]
};

var dist = {
    css: 'assets/css/',
    js:  'assets/js/',
};

gulp.task('js', function() {
    gulp.src(src.js)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist.js));
});

gulp.task('css', function() {
    gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write({ includeContent: false, sourceRoot: '/resources/sass' }))
        .pipe(gulp.dest(dist.css));

    gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write({ includeContent: false, sourceRoot: '/resources/sass' }))
        .pipe(gulp.dest(dist.css));
});

gulp.task('default', ['css', 'js']);

gulp.task('watch', function() {
    gulp.watch('resources/css/*.scss', ['css']);
});
