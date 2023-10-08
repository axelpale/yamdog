
const replaceDecorator = require('./replace')

module.exports = () => {
  // @decorators.linkNames()
  //
  // Easy way to create internal links for block name occurrences in text.
  // Searches block contents for block names and replaces each match with
  // a link to the block with matching name.
  // This decorator skips occurrences in preformatted text sections.
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

    // Collect relevant name and path data from all blocks
    // so that we can look for and replace the name occurrences with links.
    const longNameNavs = blocks.map(block => {
      return {
        name: block.name,
        hash: block.hash
      }
    })
    const shortNameNavs = blocks.map(block => {
      return {
        name: block.shortName,
        hash: block.hash
      }
    })
    const nameNavs = longNameNavs.concat(shortNameNavs)

    // Remove duplicates to avoid duplicate replacement rules.
    // Often long and short names are equal.
    // Note that this is O(n * log(n)) algorithm.
    // For algorithmic reference see:
    //   https://stackoverflow.com/a/9229821/638546
    const nameLookup = nameNavs.reduce((acc, nav) => {
      if (!(nav.name in acc)) {
        acc[nav.name] = nav
      }
      return acc
    }, {})
    const uniqNameNavs = Object.keys(nameLookup).map(key => nameLookup[key])

    // Order names so that longest are processed first.
    // This way short ones do not steal all prefixes.
    // Note sort in-place.
    uniqNameNavs.sort((a, b) => {
      return b.name.length - a.name.length
    })

    // Build replacement rules. Note JS double-escape \\
    const rules = uniqNameNavs.map(nav => {
      const navPath = '#' + nav.hash
      const escapedName = nav.name.replace('.', '\\.')
      return {
        pattern: new RegExp('(\\s|^)' + escapedName, 'g'),
        replacement: '$1[' + nav.name + '](' + navPath + ')'
      }
    })

    // Build decorator
    const decorator = replaceDecorator(rules)
    // Apply to the given blocks
    return decorator(blocks)
  }
}
