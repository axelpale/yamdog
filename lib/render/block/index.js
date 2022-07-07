const anchor = require('../anchor')

module.exports = (block) => {
  // Render a block
  //

  const anchorOutput = anchor.getElement(block)
  const headingOutput = '## ' + block.signature + '\n'

  return [
    anchorOutput,
    headingOutput
  ].join('')
}
