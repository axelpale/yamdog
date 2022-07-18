const linesToParagraphs = require('./linesToParagraphs')
const mergeDotLines = require('./mergeDotLines')

module.exports = (blocks) => {
  // Second parsing pass. Divide doc blocks into paragraphs
  // by empty lines between them.
  // Also, merge lines prefixed with '..'
  //
  // Parameters:
  //   blocks
  //     array of 1st degree block objects: { file, signatures, lines }
  //
  // Return
  //   array of 2nd degree blocks.
  //
  // Second-degree block object has properties:
  //   file
  //     string, absolute file path
  //   signatures
  //     array of string
  //   paragraphs
  //     array of paragraph objects, each having properties:
  //       lines
  //

  // Divide lines to paragraphs for each block
  const parBlocks = blocks.map((block) => {
    return {
      file: block.file,
      signatures: block.signatures,
      paragraphs: linesToParagraphs(block.lines)
    }
  })

  // Merge dot '..' lines
  const blocks2 = parBlocks.map((block) => {
    return {
      file: block.file,
      signatures: block.signatures,
      paragraphs: block.paragraphs.map((par) => {
        return {
          lines: mergeDotLines(par.lines)
        }
      })
    }
  })

  return blocks2
}
