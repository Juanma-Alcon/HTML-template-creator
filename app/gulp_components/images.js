/* eslint-disable */
const gulp = require('gulp')

// Sprite
const merge = require('merge-stream')
const imagemin = require('gulp-imagemin')
const spritesmith = require('gulp.spritesmith')
const buffer = require('vinyl-buffer')
const args = require('yargs').argv

module.exports = {

  imagesTask: () => {
    gulp.src([
        './assets/img/**',
        './core/core-components/app/assets/img/**',
        './core/core-framework/assets/img/**',
        '!./core/core-framework/assets/img/sprite'
      ])
      .pipe(imagemin())
      .pipe(gulp.dest('../dist/img/'))
  },

  spriteTask: () => {
    const spriteData = gulp.src('./assets/img/sprite/*.png').pipe(spritesmith({
      cssName: '_sprite.scss',
      imgName: 'main-sprite.png',
      cssTemplate: './assets/sprite-template/scss.sprite-template.handlebars'
    }))

    const imgStream = spriteData.img.pipe(buffer()).pipe(gulp.dest('./assets/img/'))
    const cssStream = spriteData.css.pipe(gulp.dest('./assets/scss/inc/'))

    return merge(imgStream, cssStream)
  }
}
