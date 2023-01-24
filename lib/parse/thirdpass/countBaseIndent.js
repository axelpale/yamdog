const countIndent = require('./countIndent')

module.exports = (lines) => {
  // Find indentation common for each line.
  //
  // Parameters:
  //   lines
  //     array of string
  //
  // Return
  //   a number, leading spaces that every line has
  //

  if (lines.length === 0) {
    return 0
  }

  // Find via Math.min, thus start with unrealistically large number.
  let baseIndent = 1000

  lines.forEach(line => {
    const indent = countIndent(line)
    baseIndent = Math.min(baseIndent, indent)
  })
  // baseIndent now represents the lowest indentation.

  return baseIndent
}
