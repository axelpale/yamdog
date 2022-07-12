/* eslint-disable spaced-comment */
const fs = require('fs')
const parse = require('./parse')
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
  //         .. The location of the module to document.
  //     - output
  //         string, an absolute path to the target file to generate.
  //         .. For example '/home/xeli/projects/yadog/API.md'.
  //     - name
  //         string, the module name. The module name acts as
  //         .. the signature to look for comment blocks that are
  //         .. to be included to the documentation.
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
    console.log('Found and parsed ' + blocks.length + ' comment blocks.')
    console.log('Rendering into a text...')
  }

  const markdown = render(blocks, {
    title: config.title,
    intro: config.intro
  })

  if (!config.silent) {
    const linecount = (markdown.match(/\n/g) || []).length
    console.log('Rendered ' + linecount + ' lines of documentation.')
    console.log('Saving into a file...')
  }

  // Save
  fs.writeFileSync(config.output, markdown)

  if (!config.silent) {
    console.log('API docs created successfully.')
    console.log('See ' + config.output)
  }
}
