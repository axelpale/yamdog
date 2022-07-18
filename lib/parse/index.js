const firstpass = require('./firstpass')
const secondpass = require('./secondpass')
const thirdpass = require('./thirdpass')
const fourthpass = require('./fourthpass')

module.exports = (mod) => {
  // yamdog.parse(mod)
  // yamdog.stringify(mod)
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
  //   signature
  //     string, the call signature
  //   name
  //     string, the unit name derived from the call signature.
  //   hash
  //     string, an URL friendly hash derived from the name.
  //   aliases
  //     array of alias objects { hash, name, signature }.
  //     .. Navigational data about blocks that are aliases of this block.
  //   paragraphs
  //     array of paragraph objects { type, body }
  //

  // The first pass collects documenting comment blocks.
  // The first pass strips // prefix
  // Each block1 is a { signatures, lines }.
  const blocks1 = firstpass({
    earmark: mod.earmark,
    path: mod.path
  })

  // The second pass furter divides each block into paragraphs.
  // The second pass merges .. lines
  // Each block2 is a { signatures, paragraphs: [{ lines }] }
  const blocks2 = secondpass(blocks1)

  // The third pass gives types for each paragraph.
  // Each block3 is a { signatures, paragraphs: [{ type, body }]}
  const blocks3 = thirdpass(blocks2)

  // The fourth pass creates names and hash names for each signature.
  // Each block4 is a { hash, name, signature, aliases, paragraphs }
  const blocks4 = fourthpass(blocks3)

  return blocks4
}
