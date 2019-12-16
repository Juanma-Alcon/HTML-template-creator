const $ = require('jquery')
const _ = require('underscore')

window.$ = $
window.jQuery = $

$(document).ready(() => {
  const views = [
  {
    sect: '#price-page', // Selector CSS
    module: require('./pp/script') // modulo a ejecutar
  }
  ]

  _.each(views, (section) => {
    const view = $(section.sect)
    view.length && section.module.init(view)
  })

})
