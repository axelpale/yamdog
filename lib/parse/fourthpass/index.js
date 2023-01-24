const nameFromSignature = require('./nameFromSignature')
const hashFromName = require('./hashFromName')
const partsFromName = require('./partsFromName')
const getFullName = require('./getFullName')

module.exports = (blocks, names) => {
  // Give blocks unique hash and name and a list of aliases.
  //
  // Parameters:
  //   blocks
  //     array of 3nd degree block objects { signatures, paragraphs }
  //   names
  //     An array of string or an object string:name -> string:fullname.
  //     Only the object has effect in 4th pass. It is used to map
  //     signatures to full names of the block. For example,
  //     let names = { decorators: 'yamdog.decorators' } in order to extend
  //     names of blocks whose signature begin with 'decorators' are extended
  //     to 'yamdog.decorators'.
  //
  // Return
  //   array of 4th degree block objects
  //   .. { file, hash, name, postfix, nameParts,
  //   ..   shortName, signature, aliases, paragraphs }
  //   .. where each aliases item is a similar object
  //   .. { file, hash, name, postfix, nameParts,
  //   ..   shortName, signature, aliases, paragraphs }
  //

  const uniformBlocks = []

  blocks.forEach(block => {
    const navs = block.signatures.map(sign => {
      const name = nameFromSignature(sign)
      const postfix = sign.substring(name.length)
      const fullName = getFullName(name, names)
      return {
        hash: hashFromName(fullName),
        name: fullName,
        postfix: postfix,
        nameParts: partsFromName(fullName),
        shortName: name,
        signature: sign
      }
    })

    // Form aliases by taking rest of the navs after the first.
    let aliases = []
    if (navs.length > 1) {
      aliases = navs.slice(1)
    }

    // Primary nav
    const primary = navs[0]

    uniformBlocks.push({
      file: block.file,
      hash: primary.hash,
      name: primary.name,
      postfix: primary.postfix,
      nameParts: primary.nameParts,
      shortName: primary.shortName,
      signature: primary.signature,
      aliases: aliases,
      paragraphs: block.paragraphs
    })

    // Create a block for each alias.
    // This way the aliases can be ordered alphabetically.
    aliases.forEach(alias => {
      uniformBlocks.push({
        // Note the primary file path is reused.
        file: block.file,
        hash: alias.hash,
        name: alias.name,
        postfix: alias.postfix,
        nameParts: alias.nameParts,
        shortName: alias.shortName,
        signature: alias.signature,
        // Aliases of the alias, including the primary.
        aliases: navs.filter(n => n.name !== alias.name),
        paragraphs: [] // empty paragraphs is a sign of plain alias.
      })
    })
  })

  return uniformBlocks
}
