const nameFromSignature = require('./nameFromSignature')
const hashFromName = require('./hashFromName')

module.exports = (blocks) => {
  // Give blocks unique hash and name and a list of aliases.
  //
  // Parameters:
  //   blocks
  //     array of 3nd degree block objects { signatures, paragraphs }
  //
  // Return
  //   array of 4th degree block objects
  //   .. { hash, name, signature, aliases, paragraphs }
  //   .. where each aliases item is an object { hash, name, signature }
  //

  const uniformBlocks = []

  blocks.forEach(block => {
    const navs = block.signatures.map(sign => {
      const name = nameFromSignature(sign)
      return {
        hash: hashFromName(name),
        name: name,
        signature: sign
      }
    })

    // Form aliases.
    let aliases = []
    if (navs.length > 1) {
      aliases = navs.slice(1)
    }

    // Primary nav
    const primary = navs[0]

    uniformBlocks.push({
      hash: primary.hash,
      name: primary.name,
      signature: primary.signature,
      aliases: aliases,
      paragraphs: block.paragraphs
    })

    // Create a block for each alias.
    // This way the aliases can be ordered alphabetically.
    aliases.forEach(alias => {
      uniformBlocks.push({
        hash: alias.hash,
        name: alias.name,
        signature: alias.signature,
        // Aliases of the alias, including the primary.
        aliases: navs.filter(n => n.name !== alias.name),
        paragraphs: [] // empty paragraphs is a sign of plain alias.
      })
    })
  })

  return uniformBlocks
}
