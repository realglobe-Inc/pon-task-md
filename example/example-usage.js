'use strict'

const pon = require('pon')
const ponTaskMd = require('pon-task-md')

;(async () => {
  let run = pon({
    'md:html': ponTaskMd(
      'assets/markdowns',
      'assets/html',
      {
        pattern: '**/*.md',
        format: 'html'
      }
    )
  })

  run('md:html')
}).catch((err) => console.error(err))
