
const replaceDecorator = require('./replace')
const anchorUtils = require('../render/anchor')

module.exports = () => {
  // yamdog.decorators.linkNames()
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

    // Order names so that longest are processed first.
    // This way short ones do not steal all prefixes.
    // Note sort in-place.
    names.sort((a, b) => {
      return b.length - a.length
    })

    // Build replacement rules. Note JS double-escape \\
    const rules = names.map(name => {
      const navPath = anchorUtils.getPathFromName(name)
      const escapedName = name.replace('.', '\\.')
      return {
        pattern: new RegExp('(\\s|^)' + escapedName, 'g'),
        replacement: '$1[' + name + '](' + navPath + ')'
      }
    })

    // Build decorator
    const decorator = replaceDecorator(rules)
    // Apply to the given blocks
    return decorator(blocks)
  }
}
