/* eslint-disable */
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const minify = require('gulp-cssmin')
const rename = require('gulp-rename')
const notify = require('./notify')

// const args = require('yargs').argv
// const sassVariables = require('gulp-sass-variables')
// const header = require('gulp-header')
// const remove = require('gulp-remove-content')
// const replace = require('gulp-replace')
// const contains = require('gulp-contains')

module.exports = {
  style: (dist, styleOpts = {}, filesName = "main") => {
    gulp.src(['./assets/scss/main.scss'])
      // .pipe(header('$baseImgDir: "' + baseImgDir + '";\n'))
      .pipe(sass(styleOpts).on('error', (e) => { notify.error(e, 'SASS') }))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(minify())
      .pipe(rename(filesName + '.min.css'))
      .pipe(gulp.dest(dist + '/css/'))
  }
}
