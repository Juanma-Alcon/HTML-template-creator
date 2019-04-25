/* eslint-disable */
const gulp = require('gulp')
const glob = require('glob')
const gulpif = require('gulp-if')
const babelify = require('babelify')
const uglify = require('gulp-uglify')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const rename = require('gulp-rename')
const notify = require('./notify')
const merge = require('merge-stream')

const main_files = glob.sync(
  './assets/js/main.js',
  './assets/js/components/**/*.js'
);

const core_files = glob.sync(
  './core/core-framework/assets/js/main.js',
  './core/core-framework/assets/js/**/*.js',
  './core/core-components/app/assets/js/main.js',
  './core/core-components/app/assets/js/**/*.js'
);

module.exports = {
  scriptsMain: () => {
    return browserify({ insertGlobals: true, entries: main_files, debug: true })
      .transform('babelify', { presets: ['@babel/preset-env'] })
      .transform('hbsfy')
      .bundle().on('error', (e) => { notify.error(e.toString(), 'Script') })
      .pipe(source('../dist')).pipe(buffer())
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest('../dist/js/'))
  },

  scriptsCore: () => {
    return browserify({ insertGlobals: true, entries: core_files, debug: true })
      .transform('babelify', { presets: ['@babel/preset-env'] })
      .transform('hbsfy').bundle().on('error', (e) => { notify.error(e.toString(), 'Script') })
      .pipe(source('../dist')).pipe(buffer())
      .pipe(uglify())
      .pipe(rename('core.min.js'))
      .pipe(gulp.dest('../dist/js/'))
  }

}

/* NOT
module.exports = {
  scripts: () => {
    var files = ["main", "otherPage", "otherPage2"];
    return merge(files.map(function(file) {
      return browserify({
          entries: "./app/" + file + ".jsx",
          debug: true
        }).transform(reactify)
        .bundle()
        .pipe(source(file + ".js"))
        .pipe(gulp.dest("app/dist"))
    }));
  }
}
*/
