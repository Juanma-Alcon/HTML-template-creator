const $ = require('jquery')
const _ = require('underscore')

window.$ = $
window.jQuery = $

$(document).ready(() => {
  const views = [
  //   {
  //     sect: '.cj-full-searcher', // Selector CSS
  //     module: require('./components/cj/input/searcher/script') // modulo a ejecutar
  //   }
  ]

  _.each(views, (section) => {
    const view = $(section.sect)
    view.length && section.module.init(view)
  })

})
