const renderBlock = require('./block')

module.exports = (blocks, options) => {
  // @yamdog.render(blocks, options)
  //
  // Render API docs in Markdown.
  //
  // Parameters:
  //   blocks
  //     parsed blocks
  //   options
  //     title
  //       optional string, default 'API Reference'.
  //     intro
  //       optional string, default ''.
  //
  // Return
  //   string, in Markdown syntax.
  //
  if (!options) {
    options = {}
  }

  const topAnchor = '<a name="top"></a>'

  let titleOutput = '# API Reference \n'
  if (options.title) {
    titleOutput = '# ' + options.title + '\n'
  }

  let introOutput = ''
  if (options.intro) {
    introOutput = options.intro + '\n\n'
  }

  const blocksOutput = blocks.map(renderBlock).join('\n')

  return [
    topAnchor,
    titleOutput,
    introOutput,
    blocksOutput
  ].join('\n')
}
