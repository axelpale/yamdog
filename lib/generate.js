/* eslint-disable spaced-comment */
const fs = require('fs')
const parse = require('./parse')
const decorate = require('./decorate')
const render = require('./render')
const isValidEarmark = require('./utils/isValidEarmark')

module.exports = (config) => {
  // yamdog.generate(config)
  //
  // Generate the API documentation and save as Markdown document.
  // Internally uses yamdog.parse, yamdog.decorate, and yamdog.render,
  // in this order.
  //
  /// Excluded comment for testing
  //// Excluded comment for testing
  //
  // Parameters:
  //   config
  //     object with properties
  //     - entry
  //         string, an absolute directory or file path.
  //         .. The location of the module to be documented.
  //         .. All relative require and import statements
  //         .. like `var lib = require('./lib')`
  //         .. are followed in the order they occur in the code.
  //         .. Absolute or named imports like `var _ = require('lodash')`
  //         .. and `import baz from 'foo/bar'` are skipped.
  //     - output
  //         string, an absolute path to the target file to generate.
  //         .. For example '/home/xeli/projects/yamdog/API.md'.
  //     - earmark
  //         string, the earmark signature to look for in the comment
  //         .. blocks to include to the documentation.
  //         .. The earmark is usually the module name like `mylib`.
  //         .. It does not need to match the real package name but it must
  //         .. match the signature used in the comments.
  //         OR an array of strings, for multiple alternative earmarks.
  //         OR an object of strings, for multiple alternative earmarks
  //         .. with their full names. This becomes handy if you feel it
  //         .. tedious to write the full sequence of namespaces in
  //         .. your signatures like `foo.bar.baz.biz()` instead of `baz.biz()`.
  //         .. By setting earmark { baz: 'foo.bar.baz', ... } you still ensure
  //         .. that `baz.biz()` is treated and positioned in the doc as
  //         .. the full name would.
  //     - title
  //         optional string, the document title and main heading.
  //         .. Default is `'API Documentation'`.
  //     - intro
  //         optional string, the introduction paragraph. Default is `''`.
  //     - decorators
  //         array of decorator functions. Default is `[]`.
  //     - silent
  //         boolean. Disable console output. Default is `false`.
  //

  // Handle missing and default parameters
  if (!config) {
    throw new Error('Missing configuration object.')
  }
  if (!config.entry) {
    throw new Error('Missing or invalid config.entry path.')
  }
  if (!config.output) {
    throw new Error('Missing or invalid config.output file path.')
  }
  if (!isValidEarmark(config.earmark)) {
    throw new Error('Missing or invalid config.earmark. See API docs.')
  }
  if (!Array.isArray(config.decorators)) {
    config.decorators = []
  }
  // Default for config.title and .intro are handled in yamdog.render.

  if (!config.silent) {
    console.log('Scraping code for comment blocks...')
  }

  const blocks = parse({
    earmark: config.earmark,
    path: config.entry
  })

  if (!config.silent) {
    console.log('  Found and parsed ' + blocks.length + ' comment blocks.')
    console.log('Rendering into a text...')
  }

  const decorated = decorate(blocks, config.decorators)

  const markdown = render(decorated, {
    title: config.title,
    intro: config.intro
  })

  if (!config.silent) {
    const linecount = (markdown.match(/\n/g) || []).length
    console.log('  Rendered ' + linecount + ' lines of documentation.')
    console.log('Saving into a file...')
  }

  // Save
  fs.writeFileSync(config.output, markdown)

  if (!config.silent) {
    console.log('  Saved to ' + config.output)
    console.log('Documentation created successfully.')
  }
}
