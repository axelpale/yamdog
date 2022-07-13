const firstpass = require('./firstpass')
const secondpass = require('./secondpass')
const thirdpass = require('./thirdpass')

module.exports = (mod) => {
  // yadog.parse(mod)
  //
  // Parse doc block objects from code.
  //
  // Parameters:
  //   mod
  //     earmark
  //       string, the earmark signature, for example the module name.
  //       .. Comment blocks that begin with this signature will be included.
  //     path
  //       string, absolute directory or file path to the module
  //
  // Return
  //   an array of doc block objects.
  //
  // A parsed doc block object has properties:
  //   name
  //     string, the unit name derived from the call signature
  //   signature
  //     string, the call signature
  //   paragraphs
  //     array of paragraph objects { type, body }
  //

  // The first pass collects documenting comment blocks.
  // The first pass strips // prefix
  // Each block1 is a { name, signature, lines }.
  const blocks1 = firstpass({
    earmark: mod.earmark,
    path: mod.path
  })

  // The second pass furter divides each block into paragraphs.
  // The second pass merges .. lines
  // Each block2 is a { name, signature, paragraphs: [{ lines }] }
  const blocks2 = secondpass(blocks1)

  // The third pass gives types for each paragraph.
  // Each block3 is a { name, signature, paragraphs: [{ type, body }]}
  const blocks3 = thirdpass(blocks2)

  return blocks3
}
