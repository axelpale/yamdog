
const replaceDecorator = require('./replace')

module.exports = (keywordToUrl) => {
  // decorators.linkKeywords(keywordToUrl)
  //
  // Create links for keyword occurrences in text.
  // Searches block contents for the given keywords names
  // and replaces each keyword match with a link to the matching URL.
  // Skips preformatted text sections.
  //
  // Parameters:
  //   keywordToUrl
  //     an object where keys are keywords and values are URLs.
  //
  // Example:
  // ```
  // linkKeywords({
  //   'point2d': 'geometry/point2d.html',
  //   'point3d': '#geometrypoint3d'
  // })
  // ```
  //
  // Return
  //   a function, a decorator function.
  //

  const keywords = Object.keys(keywordToUrl)

  // Build replacement rules. Note JS double-escape \\
  const rules = keywords.map(keyword => {
    const url = keywordToUrl[keyword]
    return {
      // preceded by space or beginning
      // followed by end or a non-word character, like ' ' or '.'.
      pattern: new RegExp('(\\s|^)' + keyword + '($|\\W+)', 'g'),
      replacement: '$1[' + keyword + '](' + url + ')$2'
    }
  })

  return replaceDecorator(rules)
}
