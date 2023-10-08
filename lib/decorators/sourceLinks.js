const path = require('path')

module.exports = (config) => {
  // @decorators.sourceLinks(config)
  //
  // This decorator extends each block
  // with a paragraph that contains a link to the source code file.
  //
  // Yamdog is aware of the absolute file paths of blocks.
  // In order to convert these paths to URLs, you need to specify
  // what part of the file path needs to be replaced with a URL prefix.
  //
  // Parameters
  //   config
  //     object with properties:
  //       basePath
  //         a string. The part in absolute file paths to replace with base URL.
  //         For example `'/home/johndoe/myproject'`
  //       baseUrl
  //         a string. The prefix to add in place of the base path.
  //         For example `'https://www.example.org/docs'`
  //       label
  //         optional string. Default is `'Source: '`.
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
