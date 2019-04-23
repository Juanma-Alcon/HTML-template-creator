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
const distCore = './assets/core-framework/dist';

const filesName = 'main';
const styleOpts = {
  processImport: true,
  includePaths: [],
  errLogToConsole: true
}

// Params from console
const isProduction = args.env === 'prod'
const withFramework = args.framework === 'true'

//* IMPORT GULP TASKS
const lintComp = require('./gulp_comps/lint')
const notify = require('./gulp_comps/notify')
const imagesModule = require('./gulp_comps/images')

// core-framework tasks
const styleComp = require('./assets/core-framework/gulp_comps/styles')
const scriptComp = require('./assets/core-framework/gulp_comps/scripts')

// Copy dist files from core
gulp.task('copy-core-framework', () => {
  fs.copy('./assets/core-framework/dist', '../dist', function(err) {
    if (err) return console.error(err)
    console.log('Framework Copied :)')
  })
})

// Check CanIUse task
gulp.task('doiuse', lintComp.doIUseLint)

// Optimize and generate fonts task
gulp.task('images', imagesModule.imagesTask)

// Optimize and generate sprite images
gulp.task('sprite', imagesModule.spriteTask)

// Style tasks
gulp.task('style', () => {
  lintComp.sassLintFunc();
  styleComp.style(dist, styleOpts, filesName);
})

// Scripts gulp task
gulp.task('script', () => {
  lintComp.scriptLintFunc();
  scriptComp.scriptsMain();
  scriptComp.scriptsCore(dist);
})

// HTML GULP TASK
gulp.task('html', () => {
  return gulp.src('./pages/**/*.hbs')
    .pipe(handlebars({}, {
      ignorePartials: false,
      batch: ['./partials']
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('../dist'));
});

// WATCH GULP TASK
gulp.task('watch', () => {
  gulp.watch(
    ['./assets/scss/**/*.scss', './assets/core-framework/assets/scss/**/*.scss'], ['style', 'doiuse']
  )
  gulp.watch(
    ['./assets/js/main.js',
      './assets/js/components/**/*.js',
      './assets/core-framework/assets/js/main.js',
      './assets/core-framework/assets/js/**/*.js',
      './assets/js/components/**/*.hbs'
    ], ['script']
  )
  gulp.watch(
    ['./pages/*.hbs', './pages/**/*.hbs',
      './partials/**/*.hbs',
    ], ['html']
  )
})

gulp.task('precommit', () => {
  lintComp.sassLintFunc(true)
  lintComp.scriptLintFuncPrecommit()
})

gulp.task('default', gulpSequence(
  ['sprite', 'style', 'script'],
  'copy-core-framework', 'html', 'images', 'doiuse', 'watch'
))
isProduction && gulp.task('build', gulpSequence(
  ['sprite', 'style', 'script'],
  'copy-core-framework', 'html', 'images', 'doiuse'
))
