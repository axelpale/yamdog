const countIndent = require('./countIndent')

module.exports = (lines) => {
  // Find indentation common for each line
  // and trim it off.
  //
  // Parameters
  //   lines
  //     array of string, prefix '//' already removed.

  // Find indentation common for each line.
  // Find via Math.min, thus start with unrealistically large number.
  let baseIndent = 40

  lines.forEach(line => {
    const indent = countIndent(line)
    baseIndent = Math.min(baseIndent, indent)
  })
  // baseIndent now represents the lowest indentation.

  // Shave off the base indentation
  return lines.map(line => {
    return line.substring(baseIndent)
  })
}
