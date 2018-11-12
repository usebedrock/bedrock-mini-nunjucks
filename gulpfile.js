const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const server = require('browser-sync').create();
const del = require('del');

function reload(cb) {
  server.reload();
  cb();
}

function serve(cb) {
  server.init({
    notify: false,
    server: {
      baseDir: './dist',
    }
  });
  cb();
}

var paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  templates: {
    src: 'src/templates/**/*.html',
    dest: 'dist/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images/'
  },
  all: {
    src: 'src/**/*',
  }
};



function copyImages() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
  cb();
}

function copyScripts() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest));
}

function clean(cb) {
  exports.clean = del.bind(null, ['dist']);
  cb();
}

function templates() {
  return gulp.src(paths.templates.src)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(paths.templates.dest));
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch(paths.all.src, gulp.series(gulp.parallel(templates, styles, copyImages, copyScripts), reload));
}

// Expose individual functions as gulp tasks for debugging purposes
exports.templates = templates;
exports.copyImages = copyImages;
exports.copyScripts = copyScripts;
exports.clean = clean;
exports.watch = watch;
exports.styles = styles;

// Export our defaults
exports.default = gulp.series(clean, gulp.parallel(templates, styles, copyImages, copyScripts), serve, watch);
exports.build = gulp.series(clean, gulp.parallel(templates, styles, copyImages, copyScripts));
