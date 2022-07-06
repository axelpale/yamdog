const expressions = require('../expressions')
const linesToParagraphs = require('./linesToParagraphs')

module.exports = (blocks) => {
  // Second parsing pass. Divide doc blocks into paragraphs
  // by empty lines between them.
  // Also, merge lines prefixed with '..'
  //
  // Parameters:
  //   blocks
  //     array of 1st degree blocks from the first pass.
  //
  // Return
  //   array of 2nd degree blocks.
  //
  // Second-degree block object has properties:
  //   name
  //     string
  //   paragraphs
  //     array of paragraph objects, each having properties:
  //       lines
  //

  return blocks.map((block) => {
    return {
      name: block.name,
      paragraphs: linesToParagraphs(block.lines)
    }
  })
}
