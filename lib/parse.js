const firstpass = require('./firstpass')
const secondpass = require('./secondpass')
const thirdpass = require('./thirdpass')

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
  // The first pass strips // prefix
  // Each block is a { name, lines }.
  const blocks1 = firstpass(mod)

  // The second pass furter divides each block into paragraphs.
  // The second pass merges .. lines
  // Each block2 is a { name, paragraphs: [{ lines }] }
  const blocks2 = secondpass(blocks1)

  // The third pass gives types for each paragraph.
  // Each block3 is a { name, paragraph: [{ type, lines }]}
  const blocks3 = thirdpass(blocks2)

  return blocks3
}
