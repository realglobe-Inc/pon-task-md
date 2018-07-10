/**
 * Define task
 * @function define
 * @param {string} srcDir - Source directory name
 * @param {string} destDir - Destination directory name
 * @param {Object} [options={}] - Optional settings
 * @param {string|string[]} [options.pattern] - File name pattern
 * @returns {function} Defined task
 */
'use strict'

const {byPattern} = require('pon-task-compile')

/** @lends define */
function define (srcDir, destDir, options = {}) {
  const {
    pattern = ['**/*.md'],
    watchTargets = [],
    watchDelay = 100,
    vars = {}
  } = options

  const compiler = async (code, inputSourceMap = null, options = {}) => {
    const {Converter} = require('showdown')
    const sprintf = require('sprintf')
    const converter = new Converter({
      rawHeaderId: true,
    })
    const {src, dest, watching} = options
    const html = converter.makeHtml(String(code))
    const compiled = sprintf(html, vars)

    return [compiled, null]
  }

  const task = byPattern(srcDir, destDir, compiler, {
    pattern,
    watchDelay,
    watchTargets,
    namer: (filename) => filename.replace(/\.md$/, '.html')
  })
  return task
}

module.exports = define
