/* eslint-disable */

const gutil = require('gulp-util')
const notifier = require('node-notifier')

module.exports = {
  error: (err, task) => {
    notifier.notify({
      title: `Error - ${task}`,
      message: task === 'SASS' ? err.message : err.toString()
    })

    if (task === 'SASS') {
      var message = new gutil.PluginError('sass', err.messageFormatted).toString()
      process.stderr.write(message + '\n')
    }
  },

  log: (msg, task) => {
    notifier.notify({
      message: msg,
      title: `Aviso - ${task}`
    })
  }
}
