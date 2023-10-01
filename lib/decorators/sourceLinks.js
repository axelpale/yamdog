const path = require('path')

module.exports = (config) => {
  // @decorators.sourceLinks(config)
  //
  // Creates a decorator function that extends each block
  // with a paragraph that contains a link to the source code.
  //
  // Parameters
  //   config
  //     object with props:
  //       basePath
  //         string, the dir path to trim away from abs file paths.
  //       baseUrl
  //         string, the URL to prefix the paths.
  //       label
  //         optional string, default 'Source: '.
  //
  // Return
  //   a function, a decorator function.
  //
  // Example
  // ```
  // yamdog.decorators.sourceLinks({
  //   basePath: path.resolve(__dirname, '..'),
  //   baseUrl: 'https://github.com/axelpale/yamdog/blob/main/'
  // }),
  // ```
  //
  if (!config) {
    config = {}
  }
  if (!config.basePath) {
    throw new Error('Missing basePath')
  }
  if (!config.baseUrl) {
    throw new Error('Missing baseUrl')
  }
  if (!config.label) {
    config.label = 'Source: '
  }

  const renderLink = (filepath) => {
    const relpath = path.relative(config.basePath, filepath)
    const url = config.baseUrl + relpath
    let filename = path.basename(filepath)
    // Plain 'index.js' is dull. Show at least its dir: 'example/index.js'
    if (filename === 'index.js') {
      const dirname = path.basename(path.dirname(filepath))
      filename = dirname + '/index.js'
    }
    return config.label + '[' + filename + '](' + url + ')'
  }

  return (blocks) => {
    return blocks.map((block) => {
      const newParagraphs = block.paragraphs.slice(0)

      // Render source link only for primary names. See issue #37
      if (block.isPrimary) {
        newParagraphs.push({
          type: 'text',
          body: renderLink(block.file)
        })
      }

      return Object.assign({}, block, {
        paragraphs: newParagraphs
      })
    })
  }
}
