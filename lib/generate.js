/* eslint-disable spaced-comment */
const fs = require('fs')
const parse = require('./parse')
const decorate = require('./decorate')
const render = require('./render')

module.exports = (config) => {
  // yadog.generate(config)
  //
  // Generate the API documentation to a Markdown document.
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
  //         .. For example '/home/xeli/projects/yadog/API.md'.
  //     - name
  //         string, the module name. The module name acts as
  //         .. an earmark signature to look for in comment blocks
  //         .. to include them to the documentation. The name does
  //         .. not need to match the real package name but it must
  //         .. match the signature used in the comments.
  //     - title
  //         optional string, the document title and main heading.
  //     - intro
  //         optional string, the introduction paragraph. Default ''.
  //     - decorators
  //         array of decorator functions. Default [].
  //     - silent
  //         boolean. Disable console output. Default false.
  //

  if (!config.silent) {
    console.log('Scraping code for comment blocks...')
  }

  const blocks = parse({
    name: config.name,
    path: config.entry
  })

  if (!config.silent) {
    console.log('  Found and parsed ' + blocks.length + ' comment blocks.')
    console.log('Rendering into a text...')
  }

  let decorated
  if (Array.isArray(config.decorators)) {
    decorated = decorate(blocks, config.decorators)
  } else {
    decorated = blocks
  }

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
