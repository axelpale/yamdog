const parseParagraph = require('./parseParagraph')
const trimBaseIndent = require('./trimBaseIndent')

module.exports = (blocks) => {
  // Give block paragraphs types.
  //
  // Parameters:
  //   blocks
  //     array of second-pass blocks.
  //
  // Return
  //   array of third-pass blocks.
  //

  const blocksTyped = blocks.map(block => {
    return {
      name: block.name,
      signature: block.signature,
      paragraphs: block.paragraphs.map(par => {
        const trimmedLines = trimBaseIndent(par.lines)
        return parseParagraph(trimmedLines)
      })
    }
  })

  return blocksTyped
}
