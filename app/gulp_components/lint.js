/* eslint-disable */

const gulp = require('gulp')
const gulpif = require('gulp-if')
const eslint = require('gulp-eslint')
const sassLint = require('gulp-sass-lint')

module.exports = {
  sassLintFunc: (failOnError) => {
    gulp.src([
        './assets/scss/**/*.scss',
        './core/**/*.scss',
        '!./core/core-framework/assets/scss/inc/bootstrap/**/*.scss',
        '!./core/core-framework/assets/scss/inc/_normalize.scss',
        '!./core/core-framework/assets/scss/inc/_sprite.scss',
        '!./core/core-framework/assets/scss/inc/_icons.scss',
        '!./core/**/node_modules/**/*.scss'
      ])
      .pipe(sassLint({
        'config': '.sass-lint.yml'
      }))
      .pipe(gulpif(!failOnError, sassLint.format()))
      .pipe(gulpif(failOnError, sassLint.format()))
      .pipe(gulpif(failOnError, sassLint.failOnError()))
  },

  scriptLintFunc: () => {
    gulp.src([
        './assets/js/*.js',
        './core/**/*.js',
        '!./gulpfile.js'
      ])
      .pipe(eslint())
      .pipe(eslint.format())
  },

  scriptLintFuncPrecommit: () => {
    gulp.src([
        './assets/js/*.js',
        './core/**/*.js',
        '!./gulpfile.js'
      ])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  },
}
