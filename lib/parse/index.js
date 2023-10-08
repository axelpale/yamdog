const pass01 = require('./pass01')
const pass02 = require('./pass02')
const pass03 = require('./pass03')
const pass04 = require('./pass04')
const isValidEarmark = require('../utils/isValidEarmark')
const isValidNames = require('../utils/isValidNames')

module.exports = (mod) => {
  // @yamdog.parse(mod)
  // @yamdog.stringify(mod)
  // Parse doc block objects from code.
  //
  // Parameters:
  //   mod
  //     earmark
  //       a string, the earmark prefix, for example `@`.
  //       .. Comment blocks that begin with this prefix will be included.
  //     names
  //       an array of strings, to specify valid names.
  //       .. The comment block that has a name that begins with one of
  //       .. the names in the array, will be included.
  //       an object of strings, to specify multiple valid names as keys
  //       .. and their extended full names as values.
  //     path
  //       a string, an absolute directory or file path to the module
  //
  // Return
  //   an array of doc block objects.
  //
  // A parsed doc block object has properties:
  //   file
  //     a string, the absolute file path that contains the block.
  //   signature
  //     a string, the call signature e.g. `'mylib.myfun(param)'`.
  //     .. The signature is equivalent to shortName + postfix.
  //     .. Signatures are especially used in headings.
  //   name
  //     a string, the unit name derived from the call signature.
  //     .. For example `'mylib.myfun'`
  //   postfix
  //     a string, the remainder of the signature
  //     .. after the name. For example `'(param)'`
  //   nameParts
  //     array of objects with properties:
  //       label
  //         a string, the part single name e.g. `'myfun'`
  //       name
  //         a string, the full name of the part e.g. `'mylib.myfun'`
  //       hash
  //         a string, the nav hash for the part full name e.g. `'mylibmyfun'`
  //       prefix
  //         a string, the separator character found before the label.
  //         .. For example `'.'`
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

  if (!isValidNames(mod.names)) {
    throw new Error('Missing or invalid mod.names. See API docs.')
  }

  // Normalise array to a map here to simplify handling in the passes.
  let namemap = mod.names
  if (Array.isArray(mod.names)) {
    namemap = mod.names.reduce((obj, name) => {
      obj[name] = name
      return obj
    }, {})
  }

  // The first pass collects documenting comment blocks.
  // The first pass strips // prefix
  // Each block1 is a { signatures, lines, file }.
  const blocks1 = pass01({
    earmark: mod.earmark,
    names: namemap,
    path: mod.path
  })

  // The second pass furter divides each block into paragraphs.
  // The second pass merges .. lines
  // Each block2 is a { file, signatures, paragraphs: [{ lines }] }
  const blocks2 = pass02(blocks1)

  // The third pass gives types for each paragraph.
  // Each block3 is a { file, signatures, paragraphs: [{ type, body }]}
  const blocks3 = pass03(blocks2)

  // The fourth pass creates names and hash names for each signature.
  // Each block4 is a `{
  //   file, hash, name, postfix, nameParts,
  //   shortName, signature, aliases, paragraphs
  // }`.
  const blocks4 = pass04(blocks3, namemap)

  return blocks4
}
