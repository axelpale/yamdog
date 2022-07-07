const expressions = require('../../expressions')

module.exports = (lines) => {
  // Merge lines
  //
  // Parameters:
  //   lines
  //     array of strings
  //
  // Return
  //   array of strings with '..' lines merged.
  //

  const output = []

  const len = lines.length
  for (let i = 0; i < len; i += 1) {
    const line = lines[i]
    const foundDot = line.match(expressions.dotLine)
    if (foundDot) {
      // Is a dotted line. Merge to previous line.
      const payload = foundDot[1]
      if (i === 0) {
        // The first given line is a dotted line.
        // Weird situation. Probably not intended.
        // Therefore keep as is.
        output.push(line)
      } else {
        // Dotted line that can be merged with
        // the current last output line.
        // Note we do not refer to output using i-1 because
        // that would work only with the first dotted line but
        // fail for second and further dotted lines cuz output
        // has less lines.
        const last = output.length - 1
        // Add a space. It is better to have an extra space than
        // no spaces at all; think of '.. example' vs '..example'.
        output[last] += ' ' + payload.trim()
      }
    } else {
      // Normal line.
      output.push(line)
    }
  }

  return output
}
