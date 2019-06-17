const Handlebars = require('handlebars')

Handlebars.registerHelper('foreach', function(object, iteration, block) {
  if(object) {
    let obj = (isNaN(object)) ? JSON.parse(object) : new Array(parseInt(object)),
        accum = '',
        data
    if(isNaN(iteration)) block = iteration
    if(!obj.length) obj = Object.entries(obj)
    if (block.data)  data = Handlebars.createFrame(block.data)
    for(var i = 0; i < obj.length; i++){
      if(data) data= {...data, index: i, ...obj[i], count: obj.length, iteration: iteration}
      accum += block.fn(obj[i], {data})
    }
    return accum;
  }
 return 'undefined!'
});
