const anchor = require('../anchor')
const renderParagraph = require('./paragraph')
const renderHeading = require('./heading')

module.exports = (block) => {
  // Render a block
  //

  const anchorOutput = anchor.getElement(block)

  const headingOutput = renderHeading(block) + '\n'

  const paragraphOutput = block.paragraphs.map(renderParagraph).join('\n')

  return [
    anchorOutput,
    headingOutput,
    paragraphOutput
  ].join('\n')
}
