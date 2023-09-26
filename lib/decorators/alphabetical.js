const sortCase = require('./utils/sortCase')

module.exports = (opts) => {
  // @decorators.alphabetical(opts)
  //
  // Sort blocks in alphabetical order.
  //
  // Parameters:
  //   opts
  //     optional object with properties:
  //       intro
  //         optional string or array of strings.
  //         .. Comment blocks that have these names are placed first
  //         .. regardless of their alphabetical position.
  //       outro
  //         optional string or array of strings.
  //         .. Comment blocks that have these names are placed last
  //         .. regardless of their alphabetical position.
  //       locales
  //         optional string or array that defines the locale for the order.
  //         The available values are documented in [Intl.Collator](
  //         .. https://developer.mozilla.org/en-US/docs/Web/JavaScript/
  //         .. Reference/Global_Objects/Intl/Collator).
  //         Default is `undefined` which selects the local default locale.
  //       groupCase
  //         optional boolean. Set true to group block names in the order:
  //         .. UPPER, Camel, and lower. In other words, upper case names
  //         .. like constants come first, then names with the first letter
  //         .. capitalized, like class names, and finally the names in
  //         .. lower case, such as methods and properties.
  //         Default is `false`. Note that the default might flip in
  //         .. the next major release.
  //
  // Return:
  //   a function, a decorator function.
  //

  if (!opts) {
    opts = {}
  }

  let intro = opts.intro
  let outro = opts.outro

  if (!intro) {
    intro = []
  } else if (typeof intro === 'string') {
    intro = [intro]
  } else if (!Array.isArray(intro)) {
    throw new Error('Invalid options.intro value: ' + intro)
  }

  if (!outro) {
    outro = []
  } else if (typeof outro === 'string') {
    outro = [outro]
  } else if (!Array.isArray(outro)) {
    throw new Error('Invalid options.outro value: ' + outro)
  }

  // opts.locales default is undefined by purpose.

  if (typeof opts.groupCase !== 'boolean') {
    opts.groupCase = false
  }

  return (blocks) => {
    // The decorator function.
    //
    // Returns
    //   array of blocks
    //

    const len = blocks.length

    // Spread blocks to three groups.
    // This also copies the array for immutability.
    // That is necessary because Array:sort does in-place ordering.
    const introBlocks = []
    const outroBlocks = []
    let b = []

    for (let i = 0; i < len; i += 1) {
      const block = blocks[i]
      if (intro.includes(block.name)) {
        introBlocks.push(block)
      } else if (outro.includes(block.name)) {
        outroBlocks.push(block)
      } else {
        b.push(block)
      }
    }

    if (opts.groupCase) {
      b = sortCase(b, opts.locales)
    } else {
      // Handle accents and other exotic characters with localeCompare.
      b.sort((a, b) => {
        return a.name.localeCompare(b.name, opts.locales)
      })
    }

    introBlocks.sort((a, b) => {
      return intro.indexOf(a.name) - intro.indexOf(b.name)
    })
    outroBlocks.sort((a, b) => {
      return outro.indexOf(a.name) - outro.indexOf(b.name)
    })

    // Merge
    return introBlocks.concat(b, outroBlocks)
  }
}
