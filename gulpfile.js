var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var del = require('del');
var crx = require('gulp-crx-pack');
var fs = require('fs');
var zip = require('gulp-vinyl-zip');
var execSync = require('child_process').execSync;

gulp.task('test', function(done) {
    browserify("src/kanban/app.js")
    .bundle()
    .pipe(source("app.js"))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest("src/kanban/"));
    
    var result = execSync('node_modules/phantomjs-prebuilt/bin/phantomjs test/run.js').toString();
    if (result.search('failing') === -1) {
        done();
    } else {
        done(new Error('test failed'));
    }
});

gulp.task('clean:work', ['test'], function() {
    return del(['work/**/*']);
});

gulp.task('copy:work', ['clean:work'], function() {
    return gulp.src('src/**')
    .pipe(gulp.dest('work'));
});

gulp.task('uglify', ['copy:work'], function() {
    return gulp.src('work/*.js')
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('work'));
});

gulp.task('browserify', ['uglify'], function() {
    browserify("work/kanban/app.js")
    .bundle()
    .pipe(source("app.js"))
    .pipe(streamify(uglify()))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest("work/kanban/"));
});

gulp.task('crx', ['browserify'],function() {
    return gulp.src('work')
    .pipe(crx({
        privateKey: fs.readFileSync('keys/chrome.pem', 'utf8'),
        filename: 'chrome.crx'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy:chrome-key', ['crx'], function() {
    execSync('cp keys/chrome.pem work/key.pem');
});

gulp.task('packaging:chrome', ['copy:chrome-key'], function() {
    return gulp.src('work/**/*')
    .pipe(zip.dest('dist/chrome.zip'));
});

gulp.task('build', ['packaging:chrome'], function() {
});

gulp.task('default', ['build']);
