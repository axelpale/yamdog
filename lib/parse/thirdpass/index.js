const parseParagraph = require('./parseParagraph')
const trimBaseIndent = require('./trimBaseIndent')

module.exports = (blocks) => {
  // Give block paragraphs types.
  //
  // Parameters:
  //   blocks
  //     array of 2nd degree block objects { name, signature, paragraphs }
  //     .. where each paragraph is an object { lines }
  //
  // Return
  //   array of 3rd degree block objects { name, signature, paragraphs }
  //   .. where each paragraph is an object { type, body }
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
