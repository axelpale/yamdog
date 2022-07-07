const expressions = require('../../expressions')

module.exports = (line) => {
  // Trim comment prefix off from captured doc block lines.
  // Preserves indentation in the comment after the first space.
  //
  // Parameters:
  //   line
  //     string, a raw line of code e.g. '  //   myparam'
  //
  // Return
  //   string, a trimmed line e.g. '  myparam'.
  //
  // For an empty doc line '  //', returns empty string ''.
  //

  const foundComment = line.match(expressions.comment)
  if (foundComment) {
    // Return comment contents after the first space after //
    return foundComment[1]
  }

  console.error('Attempted to trim non-doc line: ' + line)
}
