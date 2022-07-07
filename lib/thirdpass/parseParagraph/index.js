const countIndent = require('../countIndent')
const parseList = require('./parseList')

module.exports = (lines) => {
  // Parse paragraph into kind-specific object.
  //
  // Parameters:
  //   lines
  //     array of strings, non-empty and already indent-trimmed
  //     .. so that at least one of the lines has 0 indentation.
  //
  // Return
  //   object with properties:
  //     type
  //       string, type of paragraph. One of:
  //         'text'
  //           A text paragraph
  //         'list'
  //           An unordered list, for example parameters.
  //     data
  //       object for type-specific props
  //

  if (lines.length === 0) {
    throw new Error('Invalid lines')
  }

  // Single-line text
  if (lines.length === 1) {
    return {
      type: 'text',
      body: lines[0]
    }
  }

  // Detect if a list.
  const hasListTitle = countIndent(lines[0]) === 0
  // Every line indented after the first.
  const indentedAfterTitle = lines.slice(1).every((line) => {
    return countIndent(line) > 0
  })
  if (hasListTitle && indentedAfterTitle) {
    return parseList(lines)
  }

  // Multi-line text.
  // We could join lines with spaces but
  // let us preserve the line structure for
  // unforeseen benefit.
  return {
    type: 'text',
    body: lines.join('\n')
  }
}
