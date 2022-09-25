const firstpass = require('./firstpass')
const secondpass = require('./secondpass')
const thirdpass = require('./thirdpass')
const fourthpass = require('./fourthpass')
const isValidEarmark = require('../utils/isValidEarmark')

module.exports = (mod) => {
  // yamdog.parse(mod)
  // yamdog.stringify(mod)
  // Parse doc block objects from code.
  //
  // Parameters:
  //   mod
  //     earmark
  //       a string, the earmark signature, for example the module name.
  //       .. Comment blocks that begin with this signature will be included.
  //       OR an array of strings, to specify multiple valid earmarks.
  //       OR an object of strings, to specify multiple valid earmarks as keys
  //       .. and their extended full names as values.
  //     path
  //       string, absolute directory or file path to the module
  //
  // Return
  //   an array of doc block objects.
  //
  // A parsed doc block object has properties:
  //   file
  //     string, the absolute file path that contains the block.
  //   signature
  //     string, the call signature e.g. 'mylib.myfun(param)'.
  //     .. The signature is equivalent to shortName + postfix.
  //     .. Signatures are especially used in headings.
  //   name
  //     string, the unit name derived from the call signature.
  //     .. e.g. 'mylib.myfun'
  //   postfix
  //     string, the remainder of the signature after the name. e.g. '(param)'
  //   nameParts
  //     array of objects with properties:
  //       label
  //         string, the part short name e.g. 'myfun'
  //       name
  //         string, the full name e.g. 'mylib.myfun'
  //       hash
  //         string, the nav hash for the full name e.g. 'mylibmyfun'
  //       prefix
  //         string, the separator character found before the label e.g. '.'
  //   shortName
  //     a string, the original name of the block before possible
  //     .. name extensions caused by earmark name mapping.
  //   hash
  //     string, an URL friendly hash derived from the name e.g. 'mylibmyfun'
  //   aliases
  //     array of alias objects
  //     .. `{ hash, name, postfix, nameParts, shortName, signature }`
  //     .. containing navigational data about blocks that are
  //     .. aliases of this block.
  //   paragraphs
  //     array of paragraph objects { type, body }
  //
  // If a module file is not found, it will be skipped without error.
  //
  // ![Ball Skipping](docs/yamdog_boink_ball.png)
  //

  if (!isValidEarmark(mod.earmark)) {
    throw new Error('Missing or invalid mod.earmark. See API docs.')
  }

  // The first pass collects documenting comment blocks.
  // The first pass strips // prefix
  // Each block1 is a { signatures, lines, file }.
  const blocks1 = firstpass({
    earmark: mod.earmark,
    path: mod.path
  })

  // The second pass furter divides each block into paragraphs.
  // The second pass merges .. lines
  // Each block2 is a { file, signatures, paragraphs: [{ lines }] }
  const blocks2 = secondpass(blocks1)

  // The third pass gives types for each paragraph.
  // Each block3 is a { file, signatures, paragraphs: [{ type, body }]}
  const blocks3 = thirdpass(blocks2)

  // The fourth pass creates names and hash names for each signature.
  // Each block4 is a `{
  //   file, hash, name, postfix, nameParts,
  //   shortName, signature, aliases, paragraphs
  // }`.
  const blocks4 = fourthpass(blocks3, mod.earmark)

  return blocks4
}
