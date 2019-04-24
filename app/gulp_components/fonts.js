/* eslint-disable */
const gulp = require('gulp')

// iconFont
const fs = require('fs-extra')
const iconfont = require('gulp-iconfont')
const iconfontCss = require('gulp-iconfont-css')
const runTimestamp = Math.round(Date.now() / 1000)

const args = require('yargs').argv
const ang = args.ang === 'true'

let fontdir = (ang === true ? 'src/assets/core-framework/dist/fonts/' : '../fonts/') // REVISAR EN ANGULAR PRODUCT

module.exports = {
  iconFontTask: () => {
    gulp.src(['./core/core-framework/assets/icons/*.svg'], { base: './core/core-framework/assets' })
      .pipe(iconfontCss({
        fontPath: fontdir,
        fontName: 'iconfont',
        fixedCodepoints: true,
        centerHorizontally: true,
        targetPath: '/scss/inc/icons.scss'
      }))
      .pipe(iconfont({
        normalize: true,
        fontName: 'iconfont',
        prependUnicode: false,
        timestamp: runTimestamp,
        normalize: true,
        fontHeight: 1500,
        formats: ['ttf', 'eot', 'woff', 'svg', 'woff2']
      }))
      .pipe(gulp.dest('./core/core-framework/assets/fonts/'))
      .on('end', () => {
        // Al acabar, movemos el fichero generado a la carpeta donde están los css
        fs.rename('./core/core-framework/assets/fonts/scss/inc/icons.scss', `./core/core-framework/assets/scss/inc/_icons.scss`, (err) => {
            fs.remove('./core/core-framework/assets/fonts/scss')
          })
          // Movemos las fuentes a la carpeta dist
          // fs.copy('./core/core-framework/assets/fonts', '../dist/fonts')
          //   .then(() => console.log('Fonts Copied'))
      })
  },

  copyFonts: () => {
    fs.copy('./core/core-framework/assets/fonts', '../dist/fonts')
      .then(() => console.log('Fonts Copied'))
  }

}
