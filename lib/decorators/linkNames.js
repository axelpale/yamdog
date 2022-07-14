
const replaceDecorator = require('./replace')
const anchorUtils = require('../render/anchor')

module.exports = () => {
  // yadog.decorators.linkNames
  //
  // Easy way to create links for block name occurrences in text.
  // Searches block contents for block names and replaces each match with
  // a link to the block heading anchor.
  //
  // Return
  //   a function, a decorator function.
  //

  return (blocks) => {
    // The decorator function.
    //
    // Returns
    //   array of blocks
    //

    // Collect names from all blocks.
    const names = blocks.map(block => block.name)

    // Build replacement rules
    const rules = names.map(name => {
      const navPath = anchorUtils.getPathFromName(name)
      return {
        pattern: name,
        replacement: '[' + name + '](' + navPath + ')'
      }
    })

    // Build decorator
    const decorator = replaceDecorator(rules)
    // Apply to the given blocks
    return decorator(blocks)
  }
}
