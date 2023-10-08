/* eslint-disable spaced-comment */
const fs = require('fs')
const parse = require('./parse')
const decorate = require('./decorate')
const render = require('./render')
const isValidEarmark = require('./utils/isValidEarmark')
const isValidNames = require('./utils/isValidNames')

module.exports = (config) => {
  // @yamdog.generate(config)
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
  //     an object with properties
  //     - entry
  //         string, an absolute directory or file path.
  //         .. The location of the module to be documented.
  //         .. All relative require and import statements
  //         .. like `var lib = require('./lib')`
  //         .. are followed in the order they occur in the code.
  //         .. Absolute or named imports like `var _ = require('lodash')`
  //         .. and `import baz from 'foo/bar'` are skipped.
  //     - output
  //         a string, an absolute path to the target file to generate.
  //         .. For example `'/home/xeli/projects/yamdog/API.md'`.
  //     - earmark
  //         optional string, default is `'@'`.
  //         .. The earmark prefix to look for in the beginning of
  //         .. comment blocks. The matching blocks will be included to
  //         .. the docs. The rest of the line becomes the name of
  //         .. the doc block. The earmark is usually a character
  //         .. like `#` or `@` but can be longer.
  //     - names
  //         optional array of string. Specifies a filter to include only
  //         .. the blocks with a name that begins with one of the names
  //         .. in the array.
  //         optional object of strings. Specifies a filter and a mapping
  //         .. from allowed names to their full names.
  //         .. This becomes handy if you feel it
  //         .. tedious to write long sequences of namespaces in
  //         .. your names like `foo.bar.baz.biz()` instead of `baz.biz()`.
  //         .. By setting names { baz: 'foo.bar.baz', ... } you still ensure
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
  if (!config.earmark) {
    config.earmark = '@'
  } else {
    if (!isValidEarmark(config.earmark)) {
      throw new Error('Missing or invalid config.earmark. See API docs.')
    }
  }
  if (!config.names) {
    config.names = []
  } else {
    if (!isValidNames(config.names)) {
      throw new Error('Missing or invalid config.names. See API docs.')
    }
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
    names: config.names,
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
