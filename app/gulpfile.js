/* eslint-disable */

// Require modules
const gulp = require('gulp')
const _ = require('underscore')
const sass = require('gulp-sass')
const gulpif = require('gulp-if')
const args = require('yargs').argv
const rename = require('gulp-rename')
const minify = require('gulp-cssmin')
const header = require('gulp-header')
const gulpSequence = require('gulp-sequence')
const autoprefixer = require('gulp-autoprefixer')
const fs = require('fs-extra')
const glob = require('glob')
const babelify = require('babelify')
const uglify = require('gulp-uglify')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const handlebars = require('gulp-compile-handlebars')
const source = require('vinyl-source-stream')
const es = require('event-stream')

// Contants - variables - define distribution folder
const dist = '../dist';

const filesName = ['main','main_pp','main_wl'];
const styleOpts = {
  processImport: true,
  includePaths: [],
  errLogToConsole: true
}

// Params from console
const isProduction = args.env === 'prod'
const withFramework = args.framework === 'true'

//* IMPORT GULP TASKS
const lintComp = require('./gulp_components/lint')
const imagesModule = require('./gulp_components/images')
const fontsModule = require('./gulp_components/fonts')
const styleComp = require('./gulp_components/styles')
const scriptComp = require('./gulp_components/scripts')

// Optimize and generate fonts task
gulp.task('images', imagesModule.imagesTask)

// Optimize and generate sprite images
gulp.task('sprite', imagesModule.spriteTask)

// Generate and copy fonts from framework
gulp.task('fonts', () => {
  fontsModule.iconFontTask();
  fontsModule.copyFonts();
})

// Style tasks
gulp.task('style', () => {
  lintComp.sassLintFunc();
  styleComp.style(dist, styleOpts, filesName);
})

// Scripts gulp task
gulp.task('script', () => {
  lintComp.scriptLintFunc();
  scriptComp.scriptsMain();
  scriptComp.scriptsCore();
})

// HTML GULP TASK
gulp.task('html', () => {
  return gulp.src('./pages/**/*.hbs')
    .pipe(handlebars({}, {
      ignorePartials: false,
      batch: [
        './partials',
        './core/core-components/app/partials'
      ]
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('../dist'));
});

// WATCH GULP TASK
gulp.task('watch', () => {
  gulp.watch(
    [ './assets/scss/**/*.scss',
      './core/core-components/app/assets/scss/**/*.scss',
      './core/core-framework/assets/scss/**/*.scss'
    ], ['style']
  );
  gulp.watch(
    [ './assets/js/main.js',
      './assets/js/**/*.js',
      './assets/js/components/**/*.js',
      './assets/js/components/**/*.hbs',
      './core/core-framework/assets/js/main.js',
      './core/core-framework/assets/js/inc/**/*.js',
      './core/core-framework/assets/js/inc/**/*.hbs',
      './core/core-components/app/assets/js/main.js',
      './core/core-components/app/assets/js/components/**/*.js',
      './core/core-components/app/assets/js/components/**/*.hbs'
    ], ['script']
  );
  gulp.watch(
    [ './pages/*.hbs',
      './pages/**/*.hbs',
      './partials/**/*.hbs',
      './core/core-components/app/partials/**/*.hbs'
    ], ['html']
  );
})

gulp.task('precommit', () => {
  lintComp.sassLintFunc(true)
  lintComp.scriptLintFuncPrecommit()
})

gulp.task('default', gulpSequence(
  ['style', 'script'], 'html', 'images', 'watch'
))
isProduction && gulp.task('build', gulpSequence(
  ['sprite', 'style', 'script'], ['fonts'], 'html', 'images'
))
