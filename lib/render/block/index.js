const anchor = require('../anchor')
const renderParagraph = require('./paragraph')

module.exports = (block) => {
  // Render a block
  //

  const anchorOutput = anchor.getElement(block)
  const headingOutput = '## ' + block.signature + '\n'

  const paragraphOutput = block.paragraphs.map(renderParagraph).join('\n')

  return [
    anchorOutput,
    headingOutput,
    paragraphOutput
  ].join('\n')
}
