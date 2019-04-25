const $ = require('jquery')
const _ = require('underscore')

window.$ = $
window.jQuery = $

$(document).ready(() => {
  const views = [
  //   {
  //     sect: '.cj-full-searcher',
  //     module: require('./components/cj/input/searcher/script')
  //   }
  ]

  _.each(views, (section) => {
    const view = $(section.sect)
    view.length && section.module.init(view)
  })

})
