const sortCase = require('./utils/sortCase')

module.exports = (opts) => {
  // yamdog.decorators.alphabetical(opts)
  //
  // Sort blocks in alphabetical order.
  //
  // Parameters:
  //   opts
  //     optional object with properties:
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

    // Array:sort does in-place ordering. Copy for immutability.
    let b = blocks.slice(0)

    if (opts.groupCase) {
      b = sortCase(b, opts.locales)
    } else {
      // Handle accents and other exotic characters with localeCompare.
      b.sort((a, b) => {
        return a.name.localeCompare(b.name, opts.locales)
      })
    }

    return b
  }
}
