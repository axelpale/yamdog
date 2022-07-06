const firstpass = require('./firstpass')
const secondpass = require('./secondpass')

module.exports = (mod) => {
  // yadog.parse(mod)
  //
  // Parse a tree from code.
  //
  // Parameters:
  //   mod
  //     name
  //       string, module name
  //     path
  //       string, absolute file path to the module
  //
  // Return
  //   a DocTree
  //

  // The first pass collects documenting comment blocks.
  // Each block is a { name, lines }.
  const blocks1 = firstpass(mod)

  // The second pass furter divides each block into paragraphs.
  const blocks2 = secondpass(blocks1)

  return blocks2
}
